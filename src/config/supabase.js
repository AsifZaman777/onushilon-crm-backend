import WebSocket from "ws";
import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env.js";

// Polyfill WebSocket for Node.js 20 compatibility with @supabase/realtime-js
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = WebSocket;
}

function normalizeSupabaseUrl(rawUrl) {
  if (!rawUrl) return "";
  const trimmed = rawUrl.trim();

  // If user pasted postgresql:// connection string
  if (trimmed.startsWith("postgresql://") || trimmed.startsWith("postgres://")) {
    const match = trimmed.match(/postgres\.([a-z0-9_-]+):/i);
    if (match && match[1]) {
      return `https://${match[1]}.supabase.co`;
    }
  }

  // If user pasted bare project ref
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}.supabase.co`;
  }

  return trimmed;
}

let supabaseClient = null;
const resolvedUrl = normalizeSupabaseUrl(ENV.SUPABASE_URL);
const resolvedKey = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;

if (resolvedUrl && resolvedKey && !resolvedUrl.includes("your-project")) {
  try {
    supabaseClient = createClient(resolvedUrl, resolvedKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        transport: WebSocket,
      },
    });
    console.log("✅ Supabase client successfully connected to:", resolvedUrl);
  } catch (error) {
    console.error("❌ Failed to initialize Supabase client:", error.message);
  }
} else {
  console.log("ℹ️ Supabase credentials not found in .env — using local JSON persistence store.");
  console.log("   To connect Supabase: add SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY to .env");
}

export const supabase = supabaseClient;
export const isSupabaseReady = () => supabaseClient !== null;
