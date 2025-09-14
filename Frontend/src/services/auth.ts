import axios from '../utils/axios';
import type { AuthResponse, RegisterData, LoginData } from '../types/auth';


const API_URL = '/api/auth';

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};