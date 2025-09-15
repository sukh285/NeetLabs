import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

// Google OAuth Success
export const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = req.user;

    // Sign JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Set cookie for subdomain
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",           // changed from "none"
      secure: true,              // required for HTTPS
      domain: ".neetlabs.in",    // share cookie across frontend + api subdomain
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.redirect(`${process.env.FRONTEND_URL}/problems`);
  } catch (error) {
    console.error("OAuth success handler error:", error);
    res.status(500).json({ error: "OAuth login failed" });
  }
};

// Google OAuth Fail
export const googleAuthFail = (req, res) => {
  res.status(401).json({ message: "Google login failed" });
};

// GitHub OAuth Success
export const githubAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = req.user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",           // changed from "none"
      secure: true,
      domain: ".neetlabs.in",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(`${process.env.FRONTEND_URL}/problems`);
  } catch (error) {
    console.error("GitHub OAuth handler error:", error);
    res.status(500).json({ error: "GitHub login failed" });
  }
};

// GitHub OAuth Fail
export const githubAuthFail = (req, res) => {
  res.status(401).json({ message: "GitHub login failed" });
};
