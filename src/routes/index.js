import { Router } from "express";
import authRoutes from "./auth.routes.js";
import coursesRoutes from "./courses.routes.js";
import sectionsRoutes from "./sections.routes.js";
import settingsRoutes from "./settings.routes.js";
import mentorsRoutes from "./mentors.routes.js";
import mediaRoutes from "./media.routes.js";
import leadsRoutes from "./leads.routes.js";
import publicRoutes from "./public.routes.js";
import { StoreService } from "../services/store.service.js";

const router = Router();

// Health & System status check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Onushilon CRM & Admin API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    storage: StoreService.getStatus(),
  });
});

// Mount modules
router.use("/auth", authRoutes);
router.use("/courses", coursesRoutes);
router.use("/sections", sectionsRoutes);
router.use("/settings", settingsRoutes);
router.use("/mentors", mentorsRoutes);
router.use("/media", mediaRoutes);
router.use("/leads", leadsRoutes);
router.use("/public", publicRoutes);

export default router;
