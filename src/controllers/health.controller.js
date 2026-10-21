import { StoreService } from "../services/store.service.js";
import { supabase, isSupabaseReady } from "../config/supabase.js";

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

function formatBytesToMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export const HealthController = {
  async getHealth(req, res) {
    const startTime = Date.now();
    const mem = process.memoryUsage();
    const uptimeSec = process.uptime();
    const storageStatus = StoreService.getStatus();

    let databaseHealth = {
      connected: isSupabaseReady(),
      mode: storageStatus.mode,
      status: isSupabaseReady() ? "healthy" : "local_store_active",
      latencyMs: null,
    };

    if (isSupabaseReady()) {
      try {
        const pingStart = Date.now();
        const { error } = await supabase.from("site_settings").select("id").limit(1);
        databaseHealth.latencyMs = Date.now() - pingStart;
        if (error) {
          databaseHealth.status = "degraded";
          databaseHealth.error = error.message;
        } else {
          databaseHealth.status = "healthy";
        }
      } catch (err) {
        databaseHealth.status = "error";
        databaseHealth.error = err.message;
      }
    }

    const payload = {
      status: "ok",
      service: "Onushilon CRM Scalable Backend API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptimeSec),
        formatted: formatUptime(uptimeSec),
      },
      environment: process.env.NODE_ENV || "development",
      database: databaseHealth,
      storage: storageStatus,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: {
          heapUsed: formatBytesToMB(mem.heapUsed),
          heapTotal: formatBytesToMB(mem.heapTotal),
          rss: formatBytesToMB(mem.rss),
        },
      },
      endpoints: {
        root: "/",
        health: "/health",
        apiHealth: "/api/health",
        apiV1Health: "/api/v1/health",
        publicData: "/api/v1/public/all",
        adminPortal: "http://localhost:3000/admin-portal",
      },
      responseTimeMs: Date.now() - startTime,
    };

    return res.status(200).json(payload);
  },
};
