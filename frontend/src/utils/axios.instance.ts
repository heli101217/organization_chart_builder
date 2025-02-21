import axios from "axios";

const baseURL = process.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
