import axios from '../utils/axios';
import { isAxiosError } from 'axios'; // ✅ for safe error handling

const API_URL = '/api/interview';

// Define a type for the expected input, adjust as needed
export interface InterviewRequestData {
  jobTitle: string;
  skillSet: string[];
  experienceLevel: string;
}

export const generateInterviewQuestions = async (
  data: InterviewRequestData
): Promise<string[]> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data.questions; // 👈 Adjust based on your API shape
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || 'Error generating interview questions';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred while generating interview questions');
    }
  }
};
