import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resumeRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import coverLetterRoutes from "./routes/coverLetterRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/resume", resumeRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/cover-letter", coverLetterRoutes);
app.use("/summary", summaryRoutes);
app.use("/interview", interviewRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
