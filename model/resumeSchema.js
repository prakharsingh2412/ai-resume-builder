import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
  title: { type: String },
  data: { type: Object, required: true }, // Store JSON/Markdown content
  format: { type: String, enum: ["json","markdown","pdf"], default: "json" },
  content: { type: String }, // text resume content (optional)
  filePath: { type: String }, // store uploaded file path
  createdAt: { type: Date, default: Date.now },
},
{ timestamps: true });

export default mongoose.model("Resume", resumeSchema);
