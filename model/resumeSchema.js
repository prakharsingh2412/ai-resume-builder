import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  data: { type: Object, required: true }, // Store JSON/Markdown content
  format: { type: String, enum: ["json","markdown","pdf"], default: "json" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resume", resumeSchema);
