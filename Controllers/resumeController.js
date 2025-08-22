import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResume = async (req, res) => {
  try {
    const { details } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a structured JSON resume based on these details: ${details}. 
    Include fields: name, email, education, skills, experience, projects.`;

    const result = await model.generateContent(prompt);
    res.json({ resume: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
