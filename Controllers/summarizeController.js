import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Summarize the following text clearly in 3-4 bullet points: ${text}`;

    const result = await model.generateContent(prompt);
    res.json({ summary: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
