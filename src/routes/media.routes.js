import { Router } from "express";
import { MediaController } from "../controllers/media.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { uploadSingleImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", requireAuth, MediaController.getAll);
router.post("/upload", requireAuth, uploadSingleImage, MediaController.upload);
router.delete("/:id", requireAuth, MediaController.delete);

export default router;
