// routes/ai.routes.js
import express from "express";
import { askGemini } from "../controllers/ai.controllers.js";

const aiRoutes = express.Router();

aiRoutes.post("/ask", askGemini);

export default aiRoutes;
