import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resume scoring endpoint
// ...existing code...

export const scoreResume = async (resumeContent: string, jobDescription: string) => {
  try {
    const response = await api.post('/resume/score', {
      resumeContent,
      jobDescription
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to analyze resume';
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// ...existing code...

// Resume generation endpoint
export const generateResume = async (resumeData: any) => {
  try {
    const response = await api.post('/resume', resumeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to generate resume');
  }
};

// Get all resumes
export const getResumes = async () => {
  try {
    const response = await api.get('/resume');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch resumes');
  }
};

// Get resume by ID
export const getResumeById = async (id: string) => {
  try {
    const response = await api.get(`/resume/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch resume');
  }
};

// Update resume
export const updateResume = async (id: string, data: any) => {
  try {
    const response = await api.put(`/resume/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update resume');
  }
};

// Delete resume
export const deleteResume = async (id: string) => {
  try {
    const response = await api.delete(`/resume/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete resume');
  }
};

// Upload resume file
export const uploadResume = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload resume');
  }
};

export default api;