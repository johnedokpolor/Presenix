// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://scholarship-xxy2.onrender.com", // Replace with your API base URL
  baseURL: "http://localhost:1000", // Replace with your API base URL
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // Add other default headers here
  },
});

export default axiosInstance;
