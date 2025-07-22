import express from "express";
import passport from "passport";

import {
  check,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { googleAuthFail, googleAuthSuccess } from "../controllers/oauth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);

authRoutes.get("/profile", authMiddleware, getProfile);


authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/google/failure",
    session: true,
  }),
  googleAuthSuccess
);

authRoutes.get("/google/failure", googleAuthFail);


export default authRoutes;
