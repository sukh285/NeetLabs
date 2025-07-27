import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserPlan, UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendMail,
} from "../utils/mail.js";
import moment from "moment";

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

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        emailVerified: false,
        role: UserRole.USER,
        plan: UserPlan.FREE,
      },
    });

    // Send Verification Email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendMail({
      email,
      subject: "Verify your email",
      mailGenContent: emailVerificationMailGenContent(name, verificationUrl),
    });

    res.status(201).json({
      success: true,
      message:
        "Account created. Please check your email to verify before logging in.",
    });

    console.log("User created successfully:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Error creating user",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    await db.user.update({
      where: { email: decoded.email },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verification failed:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const resendVerificationToken = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    const newVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await db.user.update({
      where: { email },
      data: {
        verificationToken: newVerificationToken,
      },
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${newVerificationToken}`;

    await sendMail({
      email,
      subject: "Verify your email",
      mailGenContent: emailVerificationMailGenContent(
        user.name,
        verificationUrl
      ),
    });

    return res.status(200).json({
      message: "Verification email resent",
    });
  } catch (err) {
    console.error("Resend verification token error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // short expiry for security
    });

    await db.user.update({
      where: { email },
      data: { resetToken },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendMail({
      email,
      subject: "Reset your password",
      mailGenContent: forgotPasswordMailGenContent(user.name, resetUrl),
    });

    return res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.resetToken !== token) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
      },
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ error: "Invalid or expired token" });
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

    if (!user.emailVerified) {
      return res.status(403).json({
        error: "Please verify your email before logging in",
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
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
    });

    console.log("User logged in successfully:", user.name);

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
    const userProfile = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        plan: true,
        createdAt: true,

        problemSolved: {
          select: {
            problem: {
              select: {
                difficulty: true,
                tags: true,
              },
            },
          },
        },

        submission: {
          orderBy: { createdAt: "desc" },
          take: 5,
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

    // Tag frequency counter
    const tagCountMap = {};

    problemSolved.forEach(({ problem }) => {
      if (problem?.tags && Array.isArray(problem.tags)) {
        problem.tags.forEach((tag) => {
          tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
        });
      }
    });

    // Convert to array and sort by count desc
    const sortedTags = Object.entries(tagCountMap)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    // Optionally slice top 5 only if you want to limit it early
    const solvedTags = sortedTags.slice(0, 5);

    // Total submissions
    const totalSubmissions = _count.submission;

    // Count accepted submissions from the recent list only (for optimization)
    const acceptedSubmissions = await db.submission.count({
      where: {
        userId,
        status: "Accepted",
      },
    });

    // Last submission timestamp (from the most recent one)
    const lastSubmissionAt =
      submission.length > 0 ? submission[0].createdAt : null;

    const accuracyRate =
      totalSubmissions > 0
        ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2) + "%"
        : null;

    const last14Days = moment().subtract(30, "days").toDate();

    const recentSubs = await db.submission.findMany({
      where: {
        userId,
        createdAt: {
          gte: last14Days,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        createdAt: true,
      },
    });

    const grouped = {};

    recentSubs.forEach(({ createdAt }) => {
      const date = moment(createdAt).format("YYYY-MM-DD");
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const submissionTrends = Object.entries(grouped).map(([date, count]) => ({
      date: moment(date).format("MMM D"),
      submissions: count,
    }));

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
        submissionTrends,
        solvedTags,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to load profile" });
  }
};

// controllers/authController.js
export const deleteProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    // Safety check: Confirm user exists
    const existingUser = await db.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete related data that may not cascade
    await db.aiUsage.deleteMany({ where: { userId } });

    // Delete the user — this will cascade delete:
    // - Problems created by user
    // - Submissions by user
    // - ProblemSolved records
    // - Playlists
    // - ProblemsInPlaylist (via playlist cascade)
    await db.user.delete({
      where: { id: userId },
    });

    // Clear cookie to logout
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    console.log(`User account deleted: ${userId}`);

    return res.status(200).json({
      success: true,
      message: "User account and all related data deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    return res.status(500).json({ error: "Failed to delete user account." });
  }
};
