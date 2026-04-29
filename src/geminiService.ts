
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeAppeal(content: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following citizen appeal and provide:
1. A category (e.g., Housing, Infrastructure, Social Support, Environment, Transport, Health, Education, Other).
2. A short summary (1-2 sentences).
3. A formal, polite preliminary response in Russian.
4. Priority level based on urgency.

Appeal content:
"${content}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            summary: { type: Type.STRING },
            suggestedResponse: { type: Type.STRING },
            priority: { 
              type: Type.STRING,
              enum: ["LOW", "MEDIUM", "HIGH"]
            },
          },
          required: ["category", "summary", "suggestedResponse", "priority"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze appeal");
  }
}
