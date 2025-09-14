import axios from "../utils/axios";
import type { Resume, ResumeInput } from "../types/resume";

const API_URL = "/api/resume";

// ✅ Create a new resume
export const createResume = async (resumeData: ResumeInput): Promise<Resume> => {
  // optional: transform skills if backend expects array
  const payload = {
    ...resumeData,
    skills: resumeData.skillSet
      ? resumeData.skillSet.split(",").map((s) => s.trim())
      : [],
  };

  const response = await axios.post<Resume>(API_URL, payload);
  return response.data;
};

// ✅ Get all resumes
export const getResumes = async (): Promise<Resume[]> => {
  const response = await axios.get<Resume[]>(API_URL);
  return response.data;
};

// ✅ Get resume by ID
export const getResumeById = async (id: string): Promise<Resume> => {
  const response = await axios.get<Resume>(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Update resume
export const updateResume = async (id: string, resumeData: ResumeInput): Promise<Resume> => {
  const response = await axios.put<Resume>(`${API_URL}/${id}`, resumeData);
  return response.data;
};

// ✅ Delete resume (assumes backend sends a message or success flag)
export const deleteResume = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Upload resume (file upload, assume backend returns a Resume object)
export const uploadResume = async (formData: FormData): Promise<Resume> => {
  const response = await axios.post<Resume>(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};