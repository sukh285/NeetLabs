import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-order",authMiddleware, createOrder);
paymentRoutes.post("/verify",authMiddleware, verifyPayment);

export default paymentRoutes;
