// axios.js

import axios from 'axios';

// Create an Axios instance with custom configurations
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  withCredentials: true,
});

// Request interceptor to add headers or perform actions before the request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication headers here
    // For example, if you have a token in localStorage:
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses or errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('error.response', error.response)
      // If the server responds with a 401 status code (unauthorized), log the user out
      // You can redirect the user to the login page or perform other actions here
      // For example, clear the authentication token and redirect to the login page:
      localStorage.removeItem('access_token');
      window.location.replace('/signin');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
