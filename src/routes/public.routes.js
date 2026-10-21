import { Router } from "express";
import { PublicController } from "../controllers/public.controller.js";

const router = Router();

router.get("/all", PublicController.getAllContent);
router.get("/settings", PublicController.getSettings);
router.get("/courses", PublicController.getCourses);
router.post("/leads", PublicController.submitLead);

export default router;
