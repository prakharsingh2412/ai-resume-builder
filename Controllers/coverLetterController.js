import { GoogleGenerativeAI } from "@google/generative-ai";
import CoverLetter from "../model/coverLetterSchema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCoverLetter = async (req, res) => {
  try {
    const { userId, jobTitle, userDetails } = req.body;

    if (!userId || !jobTitle || !content) {
      return res.status(400).json({ error: "userId, jobTitle and content are required" });
    }
    // Generate cover letter using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a professional cover letter for the job: ${jobTitle}. 
    Candidate details: ${userDetails}.`;

    const result = await model.generateContent(prompt);
    const generatedCoverLetter = result.response.text();

    // Save cover letter to MongoDB
     const coverLetter = new CoverLetter({
      userId,
      jobTitle,
      content: generatedCoverLetter
    });

    await coverLetter.save();
     res.json({ message: "Cover letter generated", coverLetter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
