import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "bot"], required: true },
  content: { type: String, required: true },
});

const chatHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [messageSchema],
});

export default mongoose.model("Chat", chatHistorySchema);