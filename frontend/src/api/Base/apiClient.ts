import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { ResponseWrapper } from '@/types/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json', // default response type
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
  (response: AxiosResponse) => {
    if (response.config.responseType === 'json') {
      const data = response.data as ResponseWrapper<any>;
      if (!data.success) {
        throw new Error(data.message);
      }
      return response;
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
