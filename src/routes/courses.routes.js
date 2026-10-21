import { Router } from "express";
import { CoursesController } from "../controllers/courses.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Publicly accessible course listing or admin
router.get("/", CoursesController.getAll);
router.get("/:id", CoursesController.getById);

// Protected mutation routes
router.post("/", requireAuth, CoursesController.create);
router.put("/:id", requireAuth, CoursesController.update);
router.delete("/:id", requireAuth, CoursesController.delete);

export default router;
