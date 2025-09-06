import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

     if (!text) return res.status(400).json({ error: "Text is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Summarize the following text clearly in 3-4 bullet points: ${text}`;

    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    const summary = summaryText
      .split("\n")
      .map(line => line.replace(/^[-*]\s*/, "").trim()) // remove dash/asterisk bullets if present
      .filter(line => line !== "");
      
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
