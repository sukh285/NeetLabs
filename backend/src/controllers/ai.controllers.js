import { db } from "../libs/db.js";
import { GoogleGenAI } from "@google/genai";
import { startOfDay } from "date-fns";
import { getProblemByIdService } from "../services/problem.service.js";
import { generatePrompt } from "../services/generatePrompt.js";

const dailyLimit = Number(process.env.MAX_DAILY_LIMIT) || 5;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askGemini = async (req, res) => {
  try {
    const { problemId, userCode, question } = req.body;
    const user = req.user;

    if (!problemId || !userCode || !question) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check AI usage limit only if user role is USER (admins have no limit)
    if (user.role === "USER") {
      // Get the start of the current day (midnight)
      const today = startOfDay(new Date());

      // Try to find if the user already has a usage record for today
      const existing = await db.aiUsage.findUnique({
        where: {
          userId_date: {
            userId: user.id,
            date: today,
          },
        },
      });

      // If user has reached or exceeded daily limit, block request
      if (existing?.count >= dailyLimit) {
        return res.status(429).json({ error: "Daily AI usage limit reached" });
      }

      // Otherwise, increment usage count or create usage record for today
      await db.aiUsage.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: today,
          },
        },
        update: {
          count: { increment: 1 },
        },
        create: {
          userId: user.id,
          count: 1,
          date: today,
        },
      });
    }

    const problem = await getProblemByIdService(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const { title, description } = problem;

    const prompt = generatePrompt({
      problemTitle: title,
      problemDescription: description,
      userCode,
      question,
    });

    // ✅ Use same style as your test file
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    res.status(200).json({ reply: result.text }); // <-- note: NOT `.text()`
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};

// Add this new function to your AI controller

export const getAiUsageStatus = async (req, res) => {
  try {
    const user = req.user;

    // For admins, return unlimited status
    if (user.role === "ADMIN") {
      return res.status(200).json({
        remaining: "NA", // or "Unlimited"
        total: "NA",
        used: "NA",
        isAdmin: true
      });
    }

    const dailyLimit = Number(process.env.MAX_DAILY_LIMIT) || 5;
    
    // Get the start of the current day (midnight)
    const today = startOfDay(new Date());

    // Find usage record for today
    const usageRecord = await db.aiUsage.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
    });

    const usedToday = usageRecord?.count || 0;
    const remaining = Math.max(0, dailyLimit - usedToday);

    return res.status(200).json({
      remaining,
      total: dailyLimit,
      used: usedToday,
      isAdmin: false
    });
  } catch (error) {
    console.error("Error fetching AI usage status:", error);
    res.status(500).json({ error: "Failed to fetch usage status" });
  }
};
