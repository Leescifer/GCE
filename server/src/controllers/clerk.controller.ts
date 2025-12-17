import { Request, Response } from "express";
import { pool } from "../config/db.config";

export const index = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        clerk_id,
        user_name,
        full_name,
        age,
        gender,
        role,
        created_at
      FROM clerk;
    `);

    res.status(200).json({
      status: "Success",
      clerks: result.rows,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id: clerk_id } = req.params;

  if (!clerk_id) {
    return res.status(400).json({
      status: "Error",
      message: "Clerk ID is required",
    });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT
        clerk_id,
        user_name,
        full_name,
        age,
        gender,
        role,
        created_at
      FROM clerk
      WHERE clerk_id = $1;
      `,
      [clerk_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Clerk not found",
      });
    }

    res.status(200).json({
      status: "Success",
      clerk: rows[0],
    });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const store = async (req:Request, res:Response) => {
}

export const update = async (req: Request, res: Response) => {
  const { id: clerk_id } = req.params;
  const { full_name, age, gender, role } = req.body;

  if (!clerk_id) {
    return res.status(400).json({
      status: "Error",
      message: "Clerk ID is required",
    });
  }

  try {
    const result = await pool.query(
      `
      UPDATE clerk
      SET
        full_name = COALESCE($1, full_name),
        age = COALESCE($2, age),
        gender = COALESCE($3, gender),
        role = COALESCE($4, role),
        updated_at = NOW()
      WHERE clerk_id = $5w
      RETURNING
        clerk_id,
        user_name,
        full_name,
        age,
        gender,
        role,
        created_at,
        updated_at;
      `,
      [full_name, age, gender, role, clerk_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Clerk not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Clerk updated successfully",
      clerk: result.rows[0],
    });
  } catch (error) {
    console.error("Database update failed:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};


export const destroy = async (req: Request, res: Response) => {
  const { id: clerk_id } = req.params;

  if (!clerk_id) {
    return res.status(400).json({
      status: "Error",
      message: "Clerk ID is required",
    });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM clerk
      WHERE clerk_id = $1
      RETURNING
        clerk_id,
        user_name,
        full_name;
      `,
      [clerk_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Clerk not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Clerk deleted successfully",
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Database delete failed:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
