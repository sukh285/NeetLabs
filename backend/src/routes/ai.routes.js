// routes/ai.routes.js
import express from "express";
import { askGemini } from "../controllers/ai.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const aiRoutes = express.Router();

aiRoutes.post("/ask", authMiddleware, askGemini);

export default aiRoutes;
