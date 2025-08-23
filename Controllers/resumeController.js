import { GoogleGenerativeAI } from "@google/generative-ai";
import Resume from "../model/resumeSchema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CREATE (Generate + Save Resume)
export const generateResume = async (req, res) => {
  try {
    const { userId, details, format } = req.body;

    if (!userId || !details) {
      return res.status(400).json({ error: "userId and details are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a structured JSON resume based on these details: ${details}.
    Include fields: name, email, education, skills, experience, projects.`;

    const result = await model.generateContent(prompt);
    const generatedResume = result.response.text();

    const resume = new Resume({
      userId,
      data: generatedResume,
      format: format || "json"
    });

    await resume.save();

    res.json({ message: "Resume generated and saved successfully", resume });
  } catch (error) {
    console.error("❌ Error generating resume:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ (Get all resumes for a user)
export const getResumes = async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await Resume.find({ userId });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ (Get single resume by ID)
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE (Edit resume details manually)
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, format } = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { data, format },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE (Remove resume)
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
