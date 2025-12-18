import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    clerk_id: string;
    role: string;
    userType: string;
  };
}
