import { Router } from "express";
import authRoutes from "./auth.routes.js";
import coursesRoutes from "./courses.routes.js";
import sectionsRoutes from "./sections.routes.js";
import settingsRoutes from "./settings.routes.js";
import mentorsRoutes from "./mentors.routes.js";
import mediaRoutes from "./media.routes.js";
import leadsRoutes from "./leads.routes.js";
import publicRoutes from "./public.routes.js";
import { HealthController } from "../controllers/health.controller.js";

const router = Router();

// Health & System status check
router.get("/health", HealthController.getHealth);

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
