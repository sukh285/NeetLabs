import { db } from "../libs/db.js";
import { GoogleGenAI } from "@google/genai";
import { startOfDay } from "date-fns";
import { getProblemByIdService } from "../services/problem.service.js";
import { generatePrompt } from "../services/generatePrompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Parse limits from env; treat 'Infinity' string as JS Infinity
const parseLimit = (val) => (val === "Infinity" ? Infinity : Number(val));

const PLAN_DAILY_LIMITS = {
  Free: parseLimit(process.env.FREE_LIMIT) || 5,
  Pro: parseLimit(process.env.PRO_LIMIT) || 20,
  Advanced: parseLimit(process.env.ADVANCED_LIMIT) || Infinity,
};

export const askGemini = async (req, res) => {
  try {
    const { problemId, userCode, question } = req.body;
    const user = req.user;

    if (!problemId || !userCode || !question) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (user.role === "USER") {
      const today = startOfDay(new Date());

      const dailyLimit =
        PLAN_DAILY_LIMITS[user.plan] ?? PLAN_DAILY_LIMITS["Free"];

      if (dailyLimit !== Infinity) {
        const existing = await db.aiUsage.findUnique({
          where: {
            userId_date: {
              userId: user.id,
              date: today,
            },
          },
        });

        if (existing?.count >= dailyLimit) {
          return res
            .status(429)
            .json({ error: "Daily AI usage limit reached" });
        }

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

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    res.status(200).json({ reply: result.text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};

export const getAiUsageStatus = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "ADMIN") {
      return res.status(200).json({
        remaining: "Unlimited",
        total: "Unlimited",
        used: "NA",
        isAdmin: true,
      });
    }

    const dailyLimit =
      PLAN_DAILY_LIMITS[user.plan] ?? PLAN_DAILY_LIMITS["Free"];
    const today = startOfDay(new Date());

    const usageRecord = await db.aiUsage.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
    });

    const usedToday = usageRecord?.count || 0;
    const remaining =
      dailyLimit === Infinity
        ? "Unlimited"
        : Math.max(0, dailyLimit - usedToday);

    return res.status(200).json({
      remaining,
      total: dailyLimit === Infinity ? "Unlimited" : dailyLimit,
      used: usedToday,
      isAdmin: false,
    });
  } catch (error) {
    console.error("Error fetching AI usage status:", error);
    res.status(500).json({ error: "Failed to fetch usage status" });
  }
};
