import { API_HEAD } from '@/lib/utils';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_HEAD, // or your API base URL
  withCredentials: true, // This will include cookies in requests
});

export default axiosInstance;