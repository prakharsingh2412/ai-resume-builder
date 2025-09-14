import { useState } from 'react';
import axios from '../utils/axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url,
        data,
      });
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading, error };
};

export default useApi;