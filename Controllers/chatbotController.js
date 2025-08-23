import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../model/chartHistorySchema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { userId, message, history } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    // Retrieve or create chat history in DB
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    // Add user message to history
    chat.messages.push({ role: "user", content: message });

    // Call Gemini AI to generate bot response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const chatSession = model.startChat({
      history: history || chat.messages,
      generationConfig: { maxOutputTokens: 200 },
    });

    const botResponse = await chatSession.sendMessage(message);

    // Add bot response to chat
    chat.messages.push({ role: "bot", content: botResponse.response.text() });

    // Save updated chat to DB
    await chat.save();

    // Return bot response
    res.json({ reply: botResponse.response.text(), chat: chat.messages });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
