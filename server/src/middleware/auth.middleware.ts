import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (
    
    req: AuthRequest,
    res: Response,
    next: NextFunction

) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "Error",
            message: "Unauthorized"
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        })
    }

}