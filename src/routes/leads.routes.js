import { Router } from "express";
import { LeadsController } from "../controllers/leads.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, LeadsController.getAll);
router.put("/:id/status", requireAuth, LeadsController.updateStatus);
router.delete("/:id", requireAuth, LeadsController.delete);

export default router;
