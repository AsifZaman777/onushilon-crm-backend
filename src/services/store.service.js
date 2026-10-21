import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { supabase, isSupabaseReady } from "../config/supabase.js";
import {
  INITIAL_SETTINGS,
  INITIAL_COURSES,
  INITIAL_SECTIONS,
  INITIAL_MENTORS,
  INITIAL_MOMENTS,
} from "../database/initialData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const STORE_FILE = path.join(DATA_DIR, "crm_store.json");

// Ensure local data directory and seed file exist
function getLocalStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const initialData = {
      settings: { ...INITIAL_SETTINGS },
      courses: [...INITIAL_COURSES],
      sections: [...INITIAL_SECTIONS],
      mentors: [...INITIAL_MENTORS],
      moments: [...INITIAL_MOMENTS],
      leads: [
        {
          id: "lead-sample-1",
          full_name: "Mahmud Hasan",
          phone: "+8801712345678",
          email: "mahmud.hasan@example.com",
          course_id: "robotic",
          course_name: "Robotics & STEM Automation",
          message: "Interested in the Friday evening batch.",
          status: "new",
          notes: "Prefers online class link via WhatsApp",
          created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
          id: "lead-sample-2",
          full_name: "Farhana Sharmin",
          phone: "+8801898765432",
          email: "farhana.s@example.com",
          course_id: "art",
          course_name: "Creative Arts & Painting Studio",
          message: "Requesting syllabus for watercolor module.",
          status: "contacted",
          notes: "Spoke on phone, sending demo video on WhatsApp",
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
          updated_at: new Date(Date.now() - 3600000 * 20).toISOString(),
        },
      ],
      media_assets: [],
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading crm_store.json, resetting to defaults:", e.message);
    const initialData = {
      settings: { ...INITIAL_SETTINGS },
      courses: [...INITIAL_COURSES],
      sections: [...INITIAL_SECTIONS],
      mentors: [...INITIAL_MENTORS],
      moments: [...INITIAL_MOMENTS],
      leads: [],
      media_assets: [],
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

function saveLocalStore(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local store:", e.message);
  }
}

export const StoreService = {
  // Check backend storage mode
  getStatus() {
    return {
      mode: isSupabaseReady() ? "supabase" : "local_json",
      supabaseConnected: isSupabaseReady(),
      storeFile: STORE_FILE,
    };
  },

  // -------------------------------------------------------------
  // SETTINGS (Phone, WhatsApp, Socials, etc.)
  // -------------------------------------------------------------
  async getSettings() {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "general")
        .maybeSingle();

      if (error) {
        console.warn("Supabase getSettings error, falling back to local:", error.message);
      } else if (data) {
        return data;
      }
    }
    const store = getLocalStore();
    return store.settings;
  },

  async updateSettings(updates) {
    const payload = {
      ...updates,
      id: "general",
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("site_settings")
        .upsert(payload)
        .select()
        .single();

      if (error) {
        console.error("Supabase updateSettings error:", error.message);
        throw new Error(error.message);
      }
      return data;
    }

    const store = getLocalStore();
    store.settings = { ...store.settings, ...payload };
    saveLocalStore(store);
    return store.settings;
  },

  // -------------------------------------------------------------
  // COURSES (CRUD)
  // -------------------------------------------------------------
  async getCourses(filters = {}) {
    if (isSupabaseReady()) {
      let query = supabase.from("courses").select("*").order("display_order", { ascending: true });
      if (filters.isActive !== undefined) {
        query = query.eq("is_active", filters.isActive);
      }
      if (filters.category) {
        query = query.or(`category_en.eq.${filters.category},category_bn.eq.${filters.category}`);
      }
      const { data, error } = await query;
      if (error) {
        console.warn("Supabase getCourses error, falling back to local:", error.message);
      } else if (data) {
        return data;
      }
    }

    const store = getLocalStore();
    let list = [...store.courses];
    if (filters.isActive !== undefined) {
      list = list.filter((c) => c.is_active === filters.isActive);
    }
    if (filters.category && filters.category !== "all" && filters.category !== "All") {
      list = list.filter(
        (c) =>
          c.category_en?.toLowerCase() === filters.category.toLowerCase() ||
          c.category_bn?.toLowerCase() === filters.category.toLowerCase()
      );
    }
    return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  },

  async getCourseById(id) {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) return data;
    }
    const store = getLocalStore();
    return store.courses.find((c) => c.id === id) || null;
  },

  async createCourse(courseData) {
    const id =
      courseData.id ||
      courseData.title_en
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ||
      `course-${Date.now()}`;

    const newCourse = {
      ...courseData,
      id,
      topics_en: Array.isArray(courseData.topics_en) ? courseData.topics_en : [],
      topics_bn: Array.isArray(courseData.topics_bn) ? courseData.topics_bn : [],
      is_active: courseData.is_active !== undefined ? courseData.is_active : true,
      display_order: Number(courseData.display_order) || 99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("courses")
        .insert(newCourse)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    const existingIndex = store.courses.findIndex((c) => c.id === id);
    if (existingIndex >= 0) {
      store.courses[existingIndex] = newCourse;
    } else {
      store.courses.push(newCourse);
    }
    saveLocalStore(store);
    return newCourse;
  },

  async updateCourse(id, updates) {
    const payload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("courses")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    const index = store.courses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Course with ID "${id}" not found`);
    store.courses[index] = { ...store.courses[index], ...payload };
    saveLocalStore(store);
    return store.courses[index];
  },

  async deleteCourse(id) {
    if (isSupabaseReady()) {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return { success: true, id };
    }

    const store = getLocalStore();
    const beforeCount = store.courses.length;
    store.courses = store.courses.filter((c) => c.id !== id);
    if (store.courses.length === beforeCount) {
      throw new Error(`Course with ID "${id}" not found`);
    }
    saveLocalStore(store);
    return { success: true, id };
  },

  // -------------------------------------------------------------
  // SECTIONS (Hero, Story, Why Us, Testimonials, FAQ, CTA, etc.)
  // -------------------------------------------------------------
  async getSections() {
    if (isSupabaseReady()) {
      const { data, error } = await supabase.from("site_sections").select("*");
      if (!error && data && data.length > 0) return data;
    }
    const store = getLocalStore();
    return store.sections;
  },

  async getSectionById(sectionId) {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("site_sections")
        .select("*")
        .eq("section_id", sectionId)
        .maybeSingle();

      if (!error && data) return data;
    }
    const store = getLocalStore();
    return store.sections.find((s) => s.section_id === sectionId) || null;
  },

  async updateSection(sectionId, updates) {
    const payload = {
      ...updates,
      section_id: sectionId,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("site_sections")
        .upsert(payload)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    const index = store.sections.findIndex((s) => s.section_id === sectionId);
    if (index >= 0) {
      store.sections[index] = {
        ...store.sections[index],
        ...payload,
        data_en: updates.data_en || store.sections[index].data_en,
        data_bn: updates.data_bn || store.sections[index].data_bn,
        media: updates.media || store.sections[index].media,
      };
      saveLocalStore(store);
      return store.sections[index];
    } else {
      store.sections.push(payload);
      saveLocalStore(store);
      return payload;
    }
  },

  // -------------------------------------------------------------
  // MENTORS (CRUD)
  // -------------------------------------------------------------
  async getMentors() {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("mentors")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data;
    }
    const store = getLocalStore();
    return store.mentors.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  },

  async createMentor(mentorData) {
    const id = mentorData.id || `mentor-${Date.now()}`;
    const newMentor = {
      ...mentorData,
      id,
      display_order: Number(mentorData.display_order) || 99,
      is_active: mentorData.is_active !== undefined ? mentorData.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase.from("mentors").insert(newMentor).select().single();
      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    store.mentors.push(newMentor);
    saveLocalStore(store);
    return newMentor;
  },

  async updateMentor(id, updates) {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("mentors")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    const index = store.mentors.findIndex((m) => m.id === id);
    if (index === -1) throw new Error(`Mentor "${id}" not found`);
    store.mentors[index] = { ...store.mentors[index], ...updates };
    saveLocalStore(store);
    return store.mentors[index];
  },

  async deleteMentor(id) {
    if (isSupabaseReady()) {
      const { error } = await supabase.from("mentors").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return { success: true, id };
    }

    const store = getLocalStore();
    store.mentors = store.mentors.filter((m) => m.id !== id);
    saveLocalStore(store);
    return { success: true, id };
  },

  // -------------------------------------------------------------
  // GALLERY MOMENTS
  // -------------------------------------------------------------
  async getMoments() {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("gallery_moments")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data) return data;
    }
    const store = getLocalStore();
    return store.moments;
  },

  async createMoment(momentData) {
    const id = momentData.id || `moment-${Date.now()}`;
    const newMoment = {
      ...momentData,
      id,
      display_order: Number(momentData.display_order) || 99,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("gallery_moments")
        .insert(newMoment)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    store.moments.push(newMoment);
    saveLocalStore(store);
    return newMoment;
  },

  async deleteMoment(id) {
    if (isSupabaseReady()) {
      const { error } = await supabase.from("gallery_moments").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return { success: true, id };
    }

    const store = getLocalStore();
    store.moments = store.moments.filter((m) => m.id !== id);
    saveLocalStore(store);
    return { success: true, id };
  },

  // -------------------------------------------------------------
  // LEADS / CRM (Student Enrolment Inquiries)
  // -------------------------------------------------------------
  async getLeads(filters = {}) {
    if (isSupabaseReady()) {
      let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (filters.status) query = query.eq("status", filters.status);
      const { data, error } = await query;
      if (!error && data) return data;
    }

    const store = getLocalStore();
    let leads = [...(store.leads || [])];
    if (filters.status) {
      leads = leads.filter((l) => l.status === filters.status);
    }
    return leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  async createLead(leadData) {
    const newLead = {
      id: `lead-${Date.now()}`,
      full_name: leadData.full_name || leadData.name || "Anonymous Learner",
      phone: leadData.phone || "",
      email: leadData.email || "",
      course_id: leadData.course_id || "",
      course_name: leadData.course_name || "",
      message: leadData.message || "",
      status: "new",
      notes: leadData.notes || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase.from("leads").insert(newLead).select().single();
      if (error) {
        console.warn("Supabase lead insert error, saving to local:", error.message);
      } else if (data) {
        return data;
      }
    }

    const store = getLocalStore();
    if (!store.leads) store.leads = [];
    store.leads.unshift(newLead);
    saveLocalStore(store);
    return newLead;
  },

  async updateLeadStatus(id, status, notes = null) {
    const updates = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (notes !== null) updates.notes = notes;

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const store = getLocalStore();
    const index = (store.leads || []).findIndex((l) => l.id === id);
    if (index === -1) throw new Error(`Lead "${id}" not found`);
    store.leads[index] = { ...store.leads[index], ...updates };
    saveLocalStore(store);
    return store.leads[index];
  },

  async deleteLead(id) {
    if (isSupabaseReady()) {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return { success: true, id };
    }

    const store = getLocalStore();
    store.leads = (store.leads || []).filter((l) => l.id !== id);
    saveLocalStore(store);
    return { success: true, id };
  },

  // -------------------------------------------------------------
  // MEDIA ASSETS (tracking uploaded files)
  // -------------------------------------------------------------
  async getMediaAssets() {
    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) return data;
    }
    const store = getLocalStore();
    return store.media_assets || [];
  },

  async recordMediaAsset(assetData) {
    const record = {
      id: assetData.id || `media-${Date.now()}`,
      file_name: assetData.file_name,
      storage_path: assetData.storage_path,
      public_url: assetData.public_url,
      mime_type: assetData.mime_type,
      size_bytes: assetData.size_bytes,
      alt_text: assetData.alt_text || assetData.file_name,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseReady()) {
      const { data, error } = await supabase
        .from("media_assets")
        .insert(record)
        .select()
        .single();
      if (!error && data) return data;
    }

    const store = getLocalStore();
    if (!store.media_assets) store.media_assets = [];
    store.media_assets.unshift(record);
    saveLocalStore(store);
    return record;
  },

  async deleteMediaAsset(id) {
    if (isSupabaseReady()) {
      await supabase.from("media_assets").delete().eq("id", id);
    }
    const store = getLocalStore();
    store.media_assets = (store.media_assets || []).filter((m) => m.id !== id);
    saveLocalStore(store);
    return { success: true, id };
  },
};
