import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized- Invalid token",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
        plan: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({
      message: "Error authenticating user",
    });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      //from schema.prisma
      return res.status(403).json({
        message: "Unauthorized - Admin only",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking admin:", error);
    res.status(500).json({
      message: "Error checking admin role",
    });
  }
};

export const checkPlan = (requiredPlans = []) => {
  return (req, res, next) => {
    try {
      const userPlan = req.user.plan;

      if (!requiredPlans.includes(userPlan)) {
        return res.status(403).json({
          message: "Access denied. Upgrade your plan to access this feature.",
        });
      }

      next();
    } catch (error) {
      console.error("Error checking user plan:", error);
      res.status(500).json({
        message: "Error checking user plan",
      });
    }
  };
};
