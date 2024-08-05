import { API_HEAD } from '@/lib/utils';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_HEAD,
  withCredentials: true,
});

export default axiosInstance;