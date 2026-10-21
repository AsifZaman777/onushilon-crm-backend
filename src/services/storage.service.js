import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { supabase, isSupabaseReady } from "../config/supabase.js";
import { ENV } from "../config/env.js";
import { StoreService } from "./store.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_UPLOADS_DIR = path.resolve(__dirname, "../../public/uploads");

// Ensure local uploads directory exists
if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
  fs.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
}

export const StorageService = {
  /**
   * Upload file to Supabase Storage Bucket (with local fallback if Supabase not connected)
   * @param {Object} file - Multer file object ({ originalname, buffer, mimetype, size })
   * @param {string} folder - Optional folder within bucket (e.g. 'courses', 'sections', 'general')
   */
  async uploadFile(file, folder = "uploads") {
    if (!file || !file.buffer) {
      throw new Error("No file buffer provided for upload");
    }

    // Clean filename and generate unique name
    const ext = path.extname(file.originalname) || ".webp";
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");
    const uniqueFileName = `${folder}/${baseName}-${Date.now()}-${uuidv4().slice(0, 8)}${ext}`;

    let publicUrl = "";
    let storageType = "local";

    if (isSupabaseReady()) {
      const bucket = ENV.SUPABASE_BUCKET_NAME || "onushilon-media";

      try {
        // Ensure bucket exists or attempt upload
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(uniqueFileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });

        if (error) {
          console.warn(
            `Supabase storage upload error (bucket: ${bucket}):`,
            error.message,
            "— Falling back to local storage"
          );
        } else {
          // Retrieve public URL from Supabase bucket
          const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(uniqueFileName);

          publicUrl = urlData.publicUrl;
          storageType = "supabase";
          console.log(`✅ Uploaded to Supabase bucket "${bucket}":`, publicUrl);
        }
      } catch (err) {
        console.error("Supabase Storage exception:", err.message);
      }
    }

    // Fallback to local storage if Supabase upload didn't happen or failed
    if (!publicUrl) {
      const localFolder = path.join(LOCAL_UPLOADS_DIR, folder);
      if (!fs.existsSync(localFolder)) {
        fs.mkdirSync(localFolder, { recursive: true });
      }

      const localFileName = `${baseName}-${Date.now()}-${uuidv4().slice(0, 8)}${ext}`;
      const localFilePath = path.join(localFolder, localFileName);
      fs.writeFileSync(localFilePath, file.buffer);

      // Construct public URL
      publicUrl = `/uploads/${folder}/${localFileName}`;
      storageType = "local";
      console.log(`ℹ️ Saved to local storage:`, publicUrl);
    }

    // Record in media catalog
    const asset = await StoreService.recordMediaAsset({
      file_name: file.originalname,
      storage_path: uniqueFileName,
      public_url: publicUrl,
      mime_type: file.mimetype,
      size_bytes: file.size,
      alt_text: file.originalname,
    });

    return {
      success: true,
      publicUrl,
      storageType,
      fileName: file.originalname,
      storagePath: uniqueFileName,
      size: file.size,
      mimeType: file.mimetype,
      assetId: asset?.id,
    };
  },

  /**
   * Delete file from storage
   */
  async deleteFile(storagePath, publicUrl = null) {
    if (isSupabaseReady() && storagePath) {
      try {
        const bucket = ENV.SUPABASE_BUCKET_NAME || "onushilon-media";
        await supabase.storage.from(bucket).remove([storagePath]);
      } catch (err) {
        console.warn("Supabase file delete error:", err.message);
      }
    }

    // If local file, delete from local disk
    if (publicUrl && publicUrl.startsWith("/uploads/")) {
      const localRel = publicUrl.replace("/uploads/", "");
      const fullPath = path.join(LOCAL_UPLOADS_DIR, localRel);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (e) {
          console.warn("Local file unlink error:", e.message);
        }
      }
    }

    return { success: true };
  },

  /**
   * List files in Supabase bucket or local directory
   */
  async listFiles(folder = "") {
    if (isSupabaseReady()) {
      try {
        const bucket = ENV.SUPABASE_BUCKET_NAME || "onushilon";
        const foldersToList = folder ? [folder] : ["photos", "moments", "courses", "uploads", ""];
        const allFiles = [];
        const seen = new Set();

        for (const f of foldersToList) {
          const { data, error } = await supabase.storage.from(bucket).list(f, {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
          });

          if (!error && data) {
            for (const item of data) {
              // Ignore folder entries (item.id === null in supabase storage indicates a folder)
              if (item.id && !seen.has(item.name)) {
                seen.add(item.name);
                const pathKey = f ? `${f}/${item.name}` : item.name;
                const { data: urlData } = supabase.storage
                  .from(bucket)
                  .getPublicUrl(pathKey);
                allFiles.push({
                  name: item.name,
                  id: item.id,
                  size: item.metadata?.size || 0,
                  mimeType: item.metadata?.mimetype,
                  createdAt: item.created_at,
                  publicUrl: urlData.publicUrl,
                  storageType: "supabase",
                });
              }
            }
          }
        }

        if (allFiles.length > 0) {
          return allFiles;
        }
      } catch (e) {
        console.warn("Supabase listFiles exception:", e.message);
      }
    }

    // Return catalog from store
    const assets = await StoreService.getMediaAssets();
    return assets.map((a) => ({
      name: a.file_name,
      id: a.id,
      size: a.size_bytes,
      mimeType: a.mime_type,
      createdAt: a.created_at,
      publicUrl: a.public_url,
      storageType: a.public_url.startsWith("http") ? "supabase" : "local",
    }));
  },
};
