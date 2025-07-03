// axiosInstance.js
import axios from "axios";

// Put cookies in every request header
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: "https://presenza.onrender.com/api/", // Replace with your API base URL
  // baseURL: "http://localhost:1000/api/", // Replace with your API base URL
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // Add other default headers here
  },
});

export default axiosInstance;
