import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 5 common interview questions for the role of ${role}.`;

    const result = await model.generateContent(prompt);
    res.json({ questions: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
