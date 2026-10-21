import { Router } from "express";
import { SettingsController } from "../controllers/settings.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", SettingsController.get);
router.put("/", requireAuth, SettingsController.update);

export default router;
