import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Secret key is not defined in the environment variables");
  }
  return secret;
};

interface TokenPayload {
  clerk_id: string;
  role: string;
  userType: string;
}

export const generateTokenAndCookies = (
  user: {
    clerk_id: string;
    role: string;
  },
  res: Response,
  userType: string
) => {

  const payload: TokenPayload = {
    clerk_id: user.clerk_id,
    role: user.role,
    userType,
  };

  const token = jwt.sign(payload, getSecretKey(), {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return token;
};
