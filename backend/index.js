import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dB/db.js";

import resumeRoutes from "./routes/resumeRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import coverLetterRoutes from "./routes/coverLetterRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/resume", resumeRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000; // ✅ use from env
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
