import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, level } = req.body;

    if (!role || !level) return res.status(400).json({ error: "Role and level required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 5 common interview questions for the role of ${role}.`;

    const result = await model.generateContent(prompt);
    const questionsText = result.response.text();

     const questions = questionsText
      .split("/\n/")
      .map(q => q.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
