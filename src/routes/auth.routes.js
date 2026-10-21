import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", AuthController.login);
router.get("/me", requireAuth, AuthController.getMe);

export default router;
