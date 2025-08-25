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

    // Ensure generated text is parsed as JSON
    let parsed;
    try {
      parsed = JSON.parse(generatedResume);
    } catch {
      parsed = { raw: generatedResume }; // fallback if AI gives plain text
    }

    const resume = new Resume({
      userId: req.user.id,
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
    const resumes = await Resume.find({ userId: req.user.id });
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

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      title: req.body.title || "Untitled Resume",
      filePath: req.file.path,
    });

    res.status(201).json({ message: "Resume uploaded", resume });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Utility: simple keyword extractor
function extractKeywords(text) {
  return text
    .toLowerCase()
    .match(/\b[a-z]{3,}\b/g) // words with 3+ chars
    ?.filter(word => !["the", "and", "with", "for", "this", "that"].includes(word)) || [];
}

export const scoreResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Get latest resume of user
    const resume = await Resume.findOne({ userId: req.user.id }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({ error: "No resume found for this user" });
    }

    // Convert resume data to plain text
    let resumeText = "";
    if (resume.format === "json") {
      resumeText = JSON.stringify(resume.data);
    } else {
      // If uploaded file: for now, just store path
      resumeText = resume.data.raw || "";
    }

    // Extract keywords
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    // Count matches
    const matches = jdKeywords.filter(word => resumeKeywords.includes(word));
    const uniqueMatches = [...new Set(matches)];

    const score = Math.round((uniqueMatches.length / jdKeywords.length) * 100);

    res.json({
      jobDescription,
      score,
      matchedKeywords: uniqueMatches,
      missingKeywords: jdKeywords.filter(word => !resumeKeywords.includes(word))
    });

  } catch (err) {
    console.error("ATS Scoring Error:", err);
    res.status(500).json({ error: "Error scoring resume" });
  }
};
