import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = req.user;

    // Sign JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.redirect("http://localhost:5173"); // or wherever your frontend redirects
  } catch (error) {
    console.error("OAuth success handler error:", error);
    res.status(500).json({ error: "OAuth login failed" });
  }
};

export const googleAuthFail = (req, res) => {
  res.status(401).json({ message: "Google login failed" });
};
