import { GoogleGenerativeAI } from "@google/generative-ai";
import CoverLetter from "../model/coverLetterSchema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CREATE → Generate & Save Cover Letter
export const generateCoverLetter = async (req, res) => {
  try {
    const { userId, jobTitle, userDetails } = req.body;

    if (!userId || !jobTitle || !userDetails) {
      return res.status(400).json({ error: "userId, jobTitle and userDetails are required" });
    }

    // Generate using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a professional cover letter for the job: ${jobTitle}. 
    Candidate details: ${userDetails}.`;

    const result = await model.generateContent(prompt);
    const generatedCoverLetter = result.response.text();

    // Save to DB
    const coverLetter = new CoverLetter({
      userId,
      jobTitle,
      content: generatedCoverLetter,
    });

    await coverLetter.save();
    res.json({ message: "Cover letter generated and saved successfully", coverLetter });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// READ → Get all cover letters for a user
export const getCoverLetters = async (req, res) => {
  try {
    const { userId } = req.params;
    const letters = await CoverLetter.find({ userId });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ → Get a single cover letter by ID
export const getCoverLetterById = async (req, res) => {
  try {
    const letter = await CoverLetter.findById(req.params.id);
    if (!letter) return res.status(404).json({ error: "Cover letter not found" });
    res.json(letter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE → Edit cover letter
export const updateCoverLetter = async (req, res) => {
  try {
    const { jobTitle, content } = req.body;

    const updated = await CoverLetter.findByIdAndUpdate(
      req.params.id,
      { jobTitle, content },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Cover letter not found" });

    res.json({ message: "Cover letter updated successfully", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE → Remove cover letter
export const deleteCoverLetter = async (req, res) => {
  try {
    const deleted = await CoverLetter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cover letter not found" });

    res.json({ message: "Cover letter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
