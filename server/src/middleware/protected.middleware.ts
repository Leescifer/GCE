import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getSecretKey } from "../utils/jwt";
import { AuthRequest } from "../types/auth.types";

export const Protected = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized. Token missing.",
      });
    }

    const decoded = jwt.verify(token, getSecretKey()) as {
      clerk_id: string;
      role: string;
      userType: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "Error",
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};
