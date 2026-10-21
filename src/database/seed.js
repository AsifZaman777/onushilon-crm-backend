import { supabase, isSupabaseReady } from "../config/supabase.js";
import { ENV } from "../config/env.js";
import {
  INITIAL_SETTINGS,
  INITIAL_COURSES,
  INITIAL_SECTIONS,
  INITIAL_MENTORS,
  INITIAL_MOMENTS,
} from "./initialData.js";
import { StoreService } from "../services/store.service.js";

async function seed() {
  console.log("🌱 Starting Onushilon CRM database seed...\n");

  if (!isSupabaseReady()) {
    console.log("ℹ️ Supabase not configured in .env. Seeding local persistence store...");
    // Triggering StoreService methods ensures the store file is initialized
    await StoreService.updateSettings(INITIAL_SETTINGS);
    for (const course of INITIAL_COURSES) {
      await StoreService.createCourse(course);
    }
    for (const section of INITIAL_SECTIONS) {
      await StoreService.updateSection(section.section_id, section);
    }
    for (const mentor of INITIAL_MENTORS) {
      await StoreService.createMentor(mentor);
    }
    for (const moment of INITIAL_MOMENTS) {
      await StoreService.createMoment(moment);
    }
    console.log("✅ Local store successfully seeded with all initial data!");
    console.log("   Data location: onushilon-crm-backend/data/crm_store.json\n");
    return;
  }

  console.log("🚀 Supabase connected! Seeding Supabase PostgreSQL tables...");

  try {
    // 1. Ensure Storage Bucket exists
    const bucketName = ENV.SUPABASE_BUCKET_NAME || "onushilon-media";
    console.log(`📦 Checking/creating Supabase Storage bucket: "${bucketName}"...`);
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.warn("   Storage bucket list check warning:", bucketError.message);
    } else {
      const exists = buckets.some((b) => b.name === bucketName);
      if (!exists) {
        const { error: createBucketErr } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 15 * 1024 * 1024,
        });
        if (createBucketErr) {
          console.warn("   Could not auto-create bucket via API:", createBucketErr.message);
          console.warn("   (Please ensure bucket 'onushilon-media' is created in Supabase dashboard)");
        } else {
          console.log(`   ✅ Storage bucket "${bucketName}" created successfully!`);
        }
      } else {
        console.log(`   ✅ Storage bucket "${bucketName}" already exists.`);
      }
    }

    // 2. Seed Settings
    console.log("⚙️ Seeding site_settings...");
    const { error: setErr } = await supabase
      .from("site_settings")
      .upsert({ ...INITIAL_SETTINGS, id: "general" });
    if (setErr) console.warn("   site_settings warning:", setErr.message);
    else console.log("   ✅ site_settings seeded.");

    // 3. Seed Courses
    console.log("📚 Seeding courses...");
    for (const course of INITIAL_COURSES) {
      const { error: courseErr } = await supabase.from("courses").upsert(course);
      if (courseErr) console.warn(`   course "${course.id}" warning:`, courseErr.message);
    }
    console.log(`   ✅ ${INITIAL_COURSES.length} courses seeded.`);

    // 4. Seed Sections
    console.log("📑 Seeding site_sections...");
    for (const section of INITIAL_SECTIONS) {
      const { error: secErr } = await supabase.from("site_sections").upsert(section);
      if (secErr) console.warn(`   section "${section.section_id}" warning:`, secErr.message);
    }
    console.log(`   ✅ ${INITIAL_SECTIONS.length} site sections seeded.`);

    // 5. Seed Mentors
    console.log("👨‍🏫 Seeding mentors...");
    for (const mentor of INITIAL_MENTORS) {
      const { error: mErr } = await supabase.from("mentors").upsert(mentor);
      if (mErr) console.warn(`   mentor "${mentor.id}" warning:`, mErr.message);
    }
    console.log(`   ✅ ${INITIAL_MENTORS.length} mentors seeded.`);

    // 6. Seed Gallery Moments
    console.log("🖼️ Seeding gallery_moments...");
    for (const moment of INITIAL_MOMENTS) {
      const { error: gErr } = await supabase.from("gallery_moments").upsert(moment);
      if (gErr) console.warn(`   moment "${moment.id}" warning:`, gErr.message);
    }
    console.log(`   ✅ ${INITIAL_MOMENTS.length} gallery moments seeded.`);

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
  }
}

seed();
