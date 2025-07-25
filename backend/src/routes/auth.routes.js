import express from "express";
import passport from "passport";

import {
  check,
  deleteProfile,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resendVerificationToken,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  githubAuthFail,
  githubAuthSuccess,
  googleAuthFail,
  googleAuthSuccess,
} from "../controllers/oauth.controllers.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const authRoutes = express.Router();

const loginLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 5 }); // 5 reqs in 5 mins
const resendLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 3 }); // 3 reqs in 10 mins
const forgotLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 3 });

authRoutes.post("/register", resendLimiter, register);
authRoutes.get("/verify-email", verifyEmail);
authRoutes.post("/resend-verification-token", resendLimiter, resendVerificationToken);
authRoutes.post("/forgot-password", forgotLimiter, forgotPassword);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/login", loginLimiter, login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);

authRoutes.get("/profile", authMiddleware, getProfile);
authRoutes.delete("/profile", authMiddleware, deleteProfile);

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/google/failure",
    session: true,
  }),
  googleAuthSuccess
);

authRoutes.get("/google/failure", googleAuthFail);

// GitHub OAuth
authRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/v1/auth/github/failure",
    session: true,
  }),
  githubAuthSuccess
);

authRoutes.get("/github/failure", githubAuthFail);

export default authRoutes;
