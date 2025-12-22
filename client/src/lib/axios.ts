import axios from "axios";
import type { AuthUser } from "../context/AuthContext";

const getAuthUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem("authUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach JWT automatically
axiosInstance.interceptors.request.use((config) => {
  const authUser = getAuthUser();
  if (authUser?.token && config.headers) {
    config.headers["Authorization"] = `Bearer ${authUser.token}`;
  }
  return config;
});

// Handle global 401 errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");
      localStorage.removeItem("authUser");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
