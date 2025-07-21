import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";

config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("API Key:", process.env.GEMINI_API_KEY);


const testGemini = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",  // or "gemini-2.5-flash"
      contents: "Explain how recursion works",
    });
    console.log("✅ Gemini Response:\n", response.text);
  } catch (err) {
    console.error("❌ Error calling Gemini:", err);
  }
}

testGemini();
