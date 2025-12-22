/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios"; 
import type { AuthUser } from "../context/AuthContext";

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Restore session on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      const parsedUser: AuthUser = JSON.parse(storedUser);
      setAuthUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // LOGIN
  const login = async (user_name: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", { user_name, password });
      const user: AuthUser = response.data.user;
      setAuthUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // SIGNUP
  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      const user: AuthUser = response.data.user;
      setAuthUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  // CHANGE PASSWORD
  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await axiosInstance.post("/auth/change-password", { oldPassword, newPassword });
      return true;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Change password failed");
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.warn("Logout failed on backend", error);
    } finally {
      setAuthUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
  };

  return {
    authUser,
    isLoggedIn,
    login,
    signup,
    changePassword,
    logout,
  };
};
