// routes/ai.routes.js
import express from "express";
import { askGemini, getAiUsageStatus } from "../controllers/ai.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const aiRoutes = express.Router();

aiRoutes.post("/ask", authMiddleware, askGemini);
aiRoutes.get("/usage-status", authMiddleware, getAiUsageStatus);

export default aiRoutes;
