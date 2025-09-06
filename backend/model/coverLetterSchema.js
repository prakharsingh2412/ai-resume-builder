import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CoverLetter", coverLetterSchema);
