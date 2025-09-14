import axios from "../utils/axios";
import { CoverLetter } from "../types/coverLetter";

const API_URL = "/api/cover-letter";

export const createCoverLetter = async (coverLetterData: CoverLetter) => {
  const response = await axios.post(API_URL, coverLetterData);
  return response.data;
};

export const getCoverLetters = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCoverLetterById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateCoverLetter = async (id: string, coverLetterData: CoverLetter) => {
  const response = await axios.put(`${API_URL}/${id}`, coverLetterData);
  return response.data;
};

export const deleteCoverLetter = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};