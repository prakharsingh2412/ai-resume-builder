import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [
    {
      role: { type: String }, // "user" or "bot"
      content: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);