import express from "express";
import passport from "passport";

import {
  check,
  deleteProfile,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  githubAuthFail,
  githubAuthSuccess,
  googleAuthFail,
  googleAuthSuccess,
} from "../controllers/oauth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
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
