import { Router } from "express";
import { SectionsController } from "../controllers/sections.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", SectionsController.getAll);
router.get("/:id", SectionsController.getById);
router.put("/:id", requireAuth, SectionsController.update);

export default router;
