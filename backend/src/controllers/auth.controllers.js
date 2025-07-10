import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // console.log(req.body);
  const { email, password, name } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
    });

    console.log("User created successfully:", newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Error creating user",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
    });

    console.log("User logged in successfully:", user);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      error: "Error logging in user",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    console.log("User logout successfully");

    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({
      error: "Error logging out user",
    });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Error checking user", error);
  }
};

// controllers/authController.js
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all relevant data in a single composite query
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,

        problemSolved: {
          select: {
            problem: {
              select: {
                difficulty: true,
              },
            },
          },
        },

        submission: {
          orderBy: { createdAt: "desc" },
          take: 3,
          select: {
            id: true,
            status: true,
            language: true,
            createdAt: true,
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
              },
            },
          },
        },

        _count: {
          select: {
            problemSolved: true,
            submission: true,
          },
        },
      },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    const { problemSolved, submission, _count, ...user } = userProfile;

    // Extract difficulties for solved problems
    const difficultyCount = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    };

    problemSolved.forEach(({ problem }) => {
      if (problem?.difficulty) {
        difficultyCount[problem.difficulty]++;
      }
    });

    // Total submissions
    const totalSubmissions = _count.submission;

    // Count accepted submissions from the recent list only (for optimization)
    // Optionally, fetch full submission list if you want full accuracy
    const acceptedSubmissions = await prisma.submission.count({
      where: {
        userId,
        status: "Accepted",
      },
    });

    // Last submission timestamp (from the most recent one)
    const lastSubmissionAt = submission.length > 0 ? submission[0].createdAt : null;

    const accuracyRate =
      totalSubmissions > 0
        ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2) + "%"
        : null;

    res.status(200).json({
      user,
      stats: {
        problemsSolved: _count.problemSolved,
        totalSubmissions,
        acceptedSubmissions,
        lastSubmissionAt,
        recentSubmissions: submission,
        accuracyRate,
        solvedDifficulty: difficultyCount,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to load profile" });
  }
};

