import { Router } from "express";
import { createMeeting } from "../controllers/meetingController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

export const meetingRoutes = Router();

// ✅ ONLY CREATE (for now)
meetingRoutes.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  createMeeting
);