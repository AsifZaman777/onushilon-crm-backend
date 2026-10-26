import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment-specific file first (.env.development / .env.production), then fall back to .env
const nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
}
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME || "onushilon-media",
  JWT_SECRET: process.env.JWT_SECRET || "onushilon_crm_super_secret_jwt_key_2026",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@onushilon.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin1234",
  // Public website that must refresh its cache whenever CRM content changes
  WEBSITE_URL:
    process.env.WEBSITE_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"),
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || "",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim())
    : ["http://localhost:3000", "http://localhost:5000", "https://onushilon-crm-backend.onrender.com"],
};

export const hasSupabaseConfig = () => {
  return (
    Boolean(ENV.SUPABASE_URL) &&
    typeof ENV.SUPABASE_URL === "string" &&
    ENV.SUPABASE_URL.startsWith("http") &&
    !ENV.SUPABASE_URL.includes("your-project") &&
    (Boolean(ENV.SUPABASE_SERVICE_ROLE_KEY) || Boolean(ENV.SUPABASE_ANON_KEY))
  );
};
