import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { message, history } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const chat = model.startChat({
      history: history || [],
      generationConfig: { maxOutputTokens: 200 },
    });

    const response = await chat.sendMessage(message);
    res.json({ reply: response.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
