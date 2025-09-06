import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../model/chatHistorySchema.js";

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🟢 POST /chatbot → Chat with bot
export const chatWithBot = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Get from JWT auth middleware
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Retrieve or create chat history for this user
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    // Add user message
    chat.messages.push({ role: "user", content: message });

    // Start chat session with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const chatSession = model.startChat({
      history: chat.messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: 200 },
    });

    const botResponse = await chatSession.sendMessage(message);
    const reply = botResponse.response.text();

    // Save bot response
    chat.messages.push({ role: "bot", content: reply });
    await chat.save();

    res.json({ reply, chat: chat.messages });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 GET /chatbot/history → Get full chat history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Comes from JWT
    const chat = await Chat.findOne({ userId });

    if (!chat) return res.json({ messages: [] });
    res.json({ messages: chat.messages });
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ error: error.message });
  }
};