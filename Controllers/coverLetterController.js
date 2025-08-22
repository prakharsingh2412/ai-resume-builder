import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCoverLetter = async (req, res) => {
  try {
    const { jobDescription, userDetails } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a professional cover letter for the job: ${jobDescription}. 
    Candidate details: ${userDetails}.`;

    const result = await model.generateContent(prompt);
    res.json({ coverLetter: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
