import axiosInstance from '@/utils/axiosInstance';
import { useCallback, useEffect, useState } from 'react';

const useFetchData = <T,>(url: string, callback: (data: T) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axiosInstance.get<T>(url);
      callback(res.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, [url, callback]);

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, error, refetch: fetchData };
};

export default useFetchData;