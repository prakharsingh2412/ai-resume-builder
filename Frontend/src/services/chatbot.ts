// src/services/chatbot.ts
import axios from '../utils/axios';
import { ChatMessage } from '../types/chat';

const API_URL = '/api/chatbot';

export const chatWithBot = async (message: string): Promise<ChatMessage> => {
  const response = await axios.post(API_URL, { message });
  return response.data;
};

export const getChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  const response = await axios.get(`${API_URL}/history`, { params: { userId } });
  return response.data;
};