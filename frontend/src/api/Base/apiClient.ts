import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { ResponseWrapper } from '@/types/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<ResponseWrapper<any>>) => {
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
