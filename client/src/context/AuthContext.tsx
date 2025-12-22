/* eslint-disable react-refresh/only-export-components */
// AuthContext.tsx
import React, { createContext, type ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useSignin"; // your hook

export interface AuthUser {
  clerk_id: string;
  user_name: string;
  full_name: string;
  role: string;
  token: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use the centralized useAuth hook
  const { 
    authUser, 
    isLoggedIn, 
    login, 
    signup, 
    changePassword, 
    logout }
     = useAuth();

  return (
    <AuthContext.Provider
      value={{ authUser, isLoggedIn, login, signup, changePassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
