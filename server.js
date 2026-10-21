import app from "./src/app.js";
import { ENV } from "./src/config/env.js";
import { StoreService } from "./src/services/store.service.js";

const PORT = ENV.PORT || 5000;

const server = app.listen(PORT, () => {
  const status = StoreService.getStatus();
  console.log("\n========================================================");
  console.log("  🚀 ONUSHILON CRM & BACKEND SERVICE RUNNING");
  console.log("========================================================");
  console.log(`  🌐 Server URL:        http://localhost:${PORT}`);
  console.log(`  📊 Admin CRM Panel:   http://localhost:${PORT}/admin`);
  console.log(`  📡 API Base URL:      http://localhost:${PORT}/api/v1`);
  console.log(`  💾 Storage Mode:      ${status.mode.toUpperCase()}`);
  console.log(`  🔒 Supabase Ready:    ${status.supabaseConnected ? "YES" : "NO (using resilient local store)"}`);
  console.log("========================================================\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});
