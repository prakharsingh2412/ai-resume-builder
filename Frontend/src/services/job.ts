import axios from '../utils/axios';
import type { Job } from '../types/job';
import { isAxiosError } from 'axios';

const API_BASE_URL = '/api/jobs';

export const getJobDetails = async (id: string): Promise<Job> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data as Job;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || 'Error fetching job details';
      throw new Error(message);
    } else {
      throw new Error('Unexpected error occurred while fetching job details');
    }
  }
};
