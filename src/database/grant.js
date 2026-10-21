import pg from "pg";
import { ENV } from "../config/env.js";

async function grantPermissions() {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres.okhqtcykqdkivxsghyrv:Onushilon1234$@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres";

  console.log("Connecting to PostgreSQL...");
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected. Applying grants to Supabase roles...");

  const sql = `
    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
    GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
    GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
    NOTIFY pgrst, 'reload schema';
  `;

  await client.query(sql);
  console.log("✅ Granted all schema permissions and notified PostgREST!");
  await client.end();
}

grantPermissions().catch((err) => {
  console.error("Grant error:", err);
  process.exit(1);
});
