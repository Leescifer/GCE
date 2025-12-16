import { Request, Response } from "express";
import { pool } from "../config/db.config";
import bcrypt, { compare } from "bcrypt";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { clerk_name, age, gender, role, password } = req.body;

    if (!clerk_name || !age || !gender || !role || !password) {
      return res.status(400).json({
        status: "Error",
        message: "All fields are required",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
    INSERT INTO clerk (clerk_name, age, gender, role, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING clerk_id, clerk_name, role, created_at;
    `;

    const values = [clerk_name, age, gender, role, hashedPassword];

    const result = await pool.query(query, values);

    return res.status(201).json({
      status: "Success",
      message: "Clerk created successfully",
      data: result.rows[0],
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
    const { clerk_name, password } = req.body;

    if (!clerk_name || !password) {
      return res.status(400).json({
        error: "Error",
        message: "clerk_name and password are required",
      });
    }

    const query = `
        SELECT clerk_id, clerk_name, password 
        FROM clerk
        WHERE clerk_name = $1
        AND active_status = true
        AND deleted_at IS NULL;
        `;

    const result = await pool.query(query, [clerk_name]);

    if (result.rowCount === 0) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid Credentials",
      });
    }

    const clerk = result.rows[0];

    const isMatch = await bcrypt.compare(password, clerk.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid Credentials",
      });
    }
    
    const token = generateToken({
        clerk_id: clerk.clerk_id,
        role: clerk.role,
    })

    return res.status(200).json({
      status: "Success",
      message: "Login successfull",
      data: {
        clerk_id: clerk.clerk_id,
        clerk_name: clerk.clerk_name,
        role: clerk.role,
        token
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

// Change Logout
export const logout = async (_req:Request, res:Response) => {
    return res.status(200).json({
        status: "Success",
        message: "Logged out successfully"
    });
}

// Change Password
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const clerk_id = req.user.clerk_id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Old and new passwords are required",
      });
    }

    const result = await pool.query(
      "SELECT password FROM clerk WHERE clerk_id = $1",
      [clerk_id]
    );

    const clerk = result.rows[0];

    const isMatch = await bcrypt.compare(oldPassword, clerk.password);

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


