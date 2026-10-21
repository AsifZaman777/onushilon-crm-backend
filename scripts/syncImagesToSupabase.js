import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { supabase, isSupabaseReady } from "../src/config/supabase.js";
import { ENV } from "../src/config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBSITE_PUBLIC_DIR = path.resolve(__dirname, "../../onushilon-website/public/images");
const BUCKET_NAME = ENV.SUPABASE_BUCKET_NAME || "onushilon";

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".webp") return "image/webp";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function uploadFileToSupabase(localFilePath, storageKey) {
  const fileBuffer = fs.readFileSync(localFilePath);
  const mimeType = getMimeType(localFilePath);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storageKey, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed for ${storageKey}: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storageKey);

  return {
    publicUrl: urlData.publicUrl,
    sizeBytes: fileBuffer.length,
    mimeType,
  };
}

async function main() {
  console.log("=============================================================");
  console.log(`🚀 SYNCING ALL WEBSITE IMAGES TO SUPABASE BUCKET: "${BUCKET_NAME}"`);
  console.log("=============================================================\n");

  if (!isSupabaseReady()) {
    console.error("❌ Supabase client is not ready. Check .env configuration.");
    process.exit(1);
  }

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets && buckets.some((b) => b.name === BUCKET_NAME);
  if (!exists) {
    console.log(`Creating bucket "${BUCKET_NAME}" as public...`);
    await supabase.storage.createBucket(BUCKET_NAME, { public: true });
  }

  const urlMap = {}; // localPath -> supabasePublicUrl

  // 1. Upload photos from /public/images/photos/
  const photosDir = path.join(WEBSITE_PUBLIC_DIR, "photos");
  if (fs.existsSync(photosDir)) {
    const files = fs.readdirSync(photosDir);
    console.log(`📸 Found ${files.length} files in /images/photos...`);
    for (const file of files) {
      if (file.endsWith(".webp") || file.endsWith(".jpg") || file.endsWith(".png")) {
        const localPath = path.join(photosDir, file);
        const storageKey = `photos/${file}`;
        try {
          const res = await uploadFileToSupabase(localPath, storageKey);
          urlMap[`/images/photos/${file}`] = res.publicUrl;
          console.log(`  ✓ Uploaded: ${file} -> ${res.publicUrl}`);

          // Also record in media_assets table
          await supabase.from("media_assets").upsert(
            {
              file_name: file,
              storage_path: storageKey,
              public_url: res.publicUrl,
              mime_type: res.mimeType,
              size_bytes: res.sizeBytes,
              alt_text: file.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, ""),
            },
            { onConflict: "storage_path" }
          );
        } catch (err) {
          console.error(`  ✗ Error uploading ${file}:`, err.message);
        }
      }
    }
  }

  // 2. Upload moments from /public/images/
  const momentsFiles = fs.readdirSync(WEBSITE_PUBLIC_DIR);
  console.log(`\n🖼️ Scanning root /images for gallery moments...`);
  for (const file of momentsFiles) {
    if (file.startsWith("moment-") && (file.endsWith(".webp") || file.endsWith(".jpg"))) {
      const localPath = path.join(WEBSITE_PUBLIC_DIR, file);
      const storageKey = `moments/${file}`;
      try {
        const res = await uploadFileToSupabase(localPath, storageKey);
        urlMap[`/images/${file}`] = res.publicUrl;
        console.log(`  ✓ Uploaded: ${file} -> ${res.publicUrl}`);

        await supabase.from("media_assets").upsert(
          {
            file_name: file,
            storage_path: storageKey,
            public_url: res.publicUrl,
            mime_type: res.mimeType,
            size_bytes: res.sizeBytes,
            alt_text: file.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, ""),
          },
          { onConflict: "storage_path" }
        );
      } catch (err) {
        console.error(`  ✗ Error uploading ${file}:`, err.message);
      }
    }
  }

  console.log("\n=============================================================");
  console.log("🔄 UPDATING SUPABASE DATABASE RECORDS TO USE BUCKET URLS");
  console.log("=============================================================\n");

  // Helper to replace local URLs with bucket URLs
  function resolveUrl(currentUrl) {
    if (!currentUrl) return currentUrl;
    if (currentUrl.startsWith("http://") || currentUrl.startsWith("https://")) {
      return currentUrl; // already full url
    }
    return urlMap[currentUrl] || currentUrl;
  }

  // 3. Update Courses
  const { data: courses, error: coursesErr } = await supabase.from("courses").select("*");
  if (!coursesErr && courses) {
    console.log(`Updating ${courses.length} courses...`);
    for (const c of courses) {
      const newImg = resolveUrl(c.image_url);
      if (newImg !== c.image_url) {
        await supabase.from("courses").update({ image_url: newImg }).eq("id", c.id);
        console.log(`  ✓ Course "${c.id}" updated with bucket URL: ${newImg}`);
      }
    }
  }

  // 4. Update Mentors
  const { data: mentors, error: mentorsErr } = await supabase.from("mentors").select("*");
  if (!mentorsErr && mentors) {
    console.log(`Updating ${mentors.length} mentors...`);
    for (const m of mentors) {
      const newAvatar = resolveUrl(m.avatar_url);
      if (newAvatar !== m.avatar_url) {
        await supabase.from("mentors").update({ avatar_url: newAvatar }).eq("id", m.id);
        console.log(`  ✓ Mentor "${m.id}" updated with bucket URL: ${newAvatar}`);
      }
    }
  }

  // 5. Update Gallery Moments
  const { data: moments, error: momentsErr } = await supabase.from("gallery_moments").select("*");
  if (!momentsErr && moments) {
    console.log(`Updating ${moments.length} gallery moments...`);
    for (const g of moments) {
      const newImg = resolveUrl(g.image_url);
      if (newImg !== g.image_url) {
        await supabase.from("gallery_moments").update({ image_url: newImg }).eq("id", g.id);
        console.log(`  ✓ Moment "${g.id}" updated with bucket URL: ${newImg}`);
      }
    }
  }

  // 6. Update Site Sections (Voices testimonials, hero images, story images)
  const { data: sections, error: secErr } = await supabase.from("site_sections").select("*");
  if (!secErr && sections) {
    console.log(`Updating ${sections.length} site sections...`);
    for (const sec of sections) {
      let changed = false;
      const dataEn = { ...sec.data_en };
      const dataBn = { ...sec.data_bn };

      // Check testimonials
      if (dataEn.testimonials && Array.isArray(dataEn.testimonials)) {
        dataEn.testimonials = dataEn.testimonials.map((t) => ({
          ...t,
          image_url: resolveUrl(t.image_url),
        }));
        changed = true;
      }
      if (dataBn.testimonials && Array.isArray(dataBn.testimonials)) {
        dataBn.testimonials = dataBn.testimonials.map((t) => ({
          ...t,
          image_url: resolveUrl(t.image_url),
        }));
        changed = true;
      }

      // Check media object
      const media = { ...sec.media };
      for (const k of Object.keys(media)) {
        if (typeof media[k] === "string") {
          const resolved = resolveUrl(media[k]);
          if (resolved !== media[k]) {
            media[k] = resolved;
            changed = true;
          }
        }
      }

      if (changed) {
        await supabase
          .from("site_sections")
          .update({ data_en: dataEn, data_bn: dataBn, media })
          .eq("section_id", sec.section_id);
        console.log(`  ✓ Section "${sec.section_id}" updated with bucket URLs.`);
      }
    }
  }

  // Save urlMap to a JSON file for reference
  const mapPath = path.resolve(__dirname, "../../onushilon-website/lib/supabaseImageMap.json");
  fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2));
  console.log(`\n💾 Saved URL mapping to: ${mapPath}`);

  console.log("\n✨ Image upload & database sync completed successfully!");
}

main().catch((err) => {
  console.error("Fatal error during image sync:", err);
  process.exit(1);
});
