// src/utils/axiosInstance.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// Load the API key and base URL from environment variables
const API_KEY = process.env.REACT_APP_API_KEY as string;
const BASE_URL = process.env.REACT_APP_BASE_URL as string;

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add API_KEY to all requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.params) {
      config.params = {};
    }

    config.params.apiKey = API_KEY;

    return config;
  },
  (error) => {
    // Handle request error
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
