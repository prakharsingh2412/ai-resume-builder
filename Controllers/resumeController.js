import { GoogleGenerativeAI } from "@google/generative-ai";
import Resume from "../model/resumeSchema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResume = async (req, res) => {
  try {
    const { userId, details, format } = req.body;

    if (!userId || !details) {
      return res.status(400).json({ error: "userId and details are required" });
    }

    // Generate resume using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a structured JSON resume based on these details: ${details}.
    Include fields: name, email, education, skills, experience, projects.`;

    const result = await model.generateContent(prompt);
    const generatedResume = result.response.text();

    // Save resume to MongoDB
    const resume = new Resume({
      userId,
      data: generatedResume,
      format: format || "json"
    });

    await resume.save();

    // Return saved resume
    res.json({ message: "Resume generated and saved successfully", resume });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
