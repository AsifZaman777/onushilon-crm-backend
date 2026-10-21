import { Router } from "express";
import { MentorsController } from "../controllers/mentors.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", MentorsController.getAll);
router.post("/", requireAuth, MentorsController.create);
router.put("/:id", requireAuth, MentorsController.update);
router.delete("/:id", requireAuth, MentorsController.delete);

export default router;
