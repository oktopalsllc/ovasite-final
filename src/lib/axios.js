// axios.js

import axios from "axios";

// Create an Axios instance with custom configurations
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  withCredentials: true,
});

// Request interceptor to add headers or perform actions before the request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = `Bapplication/json`;
    config.headers["Content-Type"] = `application/json`;

    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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

    if (error.response && error.response.status === 403) {
      localStorage.removeItem("access_token");
      window.location.replace("/signin");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
