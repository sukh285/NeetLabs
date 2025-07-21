import { GoogleGenAI } from "@google/genai";
import { getProblemByIdService } from "../services/problem.service.js";
import { generatePrompt } from "../libs/generatePrompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askGemini = async (req, res) => {
  try {
    const { problemId, userCode, question } = req.body;

    if (!problemId || !userCode || !question) {
      return res.status(400).json({ error: "Missing required fields" });
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
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    res.status(200).json({ reply: result.text }); // <-- note: NOT `.text()`
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};
