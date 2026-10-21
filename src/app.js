import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { HealthController } from "./controllers/health.controller.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers with cross-origin image sharing allowed
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Allows inline scripts/styles for the sleek admin dashboard
  })
);

// CORS setup
const allowedOrigins = [
  ...ENV.CLIENT_ORIGIN,
  "http://localhost:3000",
  "http://localhost:5000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV === "development" ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com") ||
        origin.includes("onushilon")
      ) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Request logging
app.use(morgan("dev"));

// Body parsing
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static files: uploaded media
app.use("/uploads", express.static(path.resolve(__dirname, "../public/uploads")));

// Static files: authentic photos from website public/images
app.use("/images", express.static(path.resolve(__dirname, "../../onushilon-website/public/images")));

// Disable HTTP caching for all API responses so dashboard and frontend see mutations instantly
app.use("/api/v1", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

// API v1 Routes
app.use("/api/v1", apiRoutes);

// Standalone health endpoints (supports standard load balancers & monitoring tools)
app.get("/health", HealthController.getHealth);
app.get("/api/health", HealthController.getHealth);

// Root information endpoint
app.get("/", (req, res) => {
  res.json({
    service: "Onushilon CRM Scalable Backend API",
    version: "1.0.0",
    status: "online",
    healthEndpoints: ["/health", "/api/health", "/api/v1/health"],
    adminPortalUrl: "http://localhost:3000/admin-portal",
  });
});

// Admin redirect to Next.js admin portal
app.get(/^\/admin/, (req, res) => {
  res.redirect("http://localhost:3000/admin-portal");
});

// Centralized error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
