import { Request, Response } from "express";
import { pool } from "../config/db.config";
import bcrypt from "bcrypt";
import { generateTokenAndCookies } from "../utils/jwt";
import { AuthRequest } from "../types/auth.types";

interface Clerk {
  clerk_id: string;
  user_name: string;
  full_name: string;
  role: string;
  password: string;
  active_status?: boolean;
  deleted_at?: Date | null;
}

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !lastName || !email || !role || !password) {
      return res.status(400).json({
        status: "Error",
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const full_name = `${firstName} ${lastName}`;
    const user_name = email; // or generate username

    const query = `
      INSERT INTO clerk (user_name, full_name, role, password)
      VALUES ($1, $2, $3, $4)
      RETURNING clerk_id, user_name, full_name, role;
    `;
    const values = [user_name, full_name, role, hashedPassword];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    // Optionally generate token and set cookie
    const token = generateTokenAndCookies(
      { clerk_id: user.clerk_id, role: user.role },
      res,
      "clerk"
    );

    return res.status(201).json({
      status: "Success",
      message: "User created successfully",
      user: { ...user, token },
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};


// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Email and password are required",
      });
    }

    const query = `
      SELECT clerk_id, user_name, full_name, role, password
      FROM clerk
      WHERE user_name = $1
        AND active_status = true
        AND deleted_at IS NULL;
    `;
    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid credentials",
      });
    }

    const clerk = result.rows[0];
    const isMatch = await bcrypt.compare(password, clerk.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid credentials",
      });
    }

    const token = generateTokenAndCookies(
      { clerk_id: clerk.clerk_id, role: clerk.role },
      res,
      "clerk"
    );

    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      user: {
        clerk_id: clerk.clerk_id,
        user_name: clerk.user_name,
        full_name: clerk.full_name,
        role: clerk.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};


// Logout
export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "Success",
    message: "Logged out successfully",
  });
};

// Change Password
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const clerk_id = req.user?.clerk_id;

    if (!clerk_id) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized",
      });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Old and new passwords are required",
      });
    }

    const result = await pool.query<{ password: string }>(
      "SELECT password FROM clerk WHERE clerk_id = $1",
      [clerk_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Error",
        message: "Old password is incorrect",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE clerk SET password = $1, updated_at = NOW() WHERE clerk_id = $2",
      [hashedNewPassword, clerk_id]
    );

    return res.status(200).json({
      status: "Success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error", error);
    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
