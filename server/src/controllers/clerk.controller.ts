import { Request, Response } from "express";
import { pool } from "../config/db.config.js";

export const index = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
            SELECT * FROM clerk;
            `);

    res.status(200).json({
      status: "Success",
      clerks: result.rows,
    });
  } catch (error) {
    console.error("Database query fields: ", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id: clerk_id } = req.params;

  if (!clerk_id) {
    return res.status(403).json({
      status: "Error",
      message: "Clerk ID is required",
    });
  }

  try {
    const { rows } = await pool.query(
      `
        SELECT 
        c.clerk_id,
        c.clerk_name,
        c.age,
        c.gender,
        c.role,
        c.crated_at
        FROM clerk AS c
        WHERE c.clerk_id = $1
            `,
      [clerk_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        messsage: "Clerk not found",
      });
    }

    res.status(200).json({
      status: "Success",
      clerk: rows[0],
    });
  } catch (error) {
    console.error("Database query fields: ", error);
    res.status(500).json({
      status: "Error",
      message: "Internam Server Error",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id: clerk_id } = req.params;
  const { clerk_name, age, gender, role } = req.body;

  if (!clerk_id) {
    return res.status(403).json({
      status: "Error",
      message: "Clerlk ID is required",
    });
  }

  try {
    const existing = await pool.query(
      `
        SELECT * FROM clerk WHERE clerk_id = $1`,
      [clerk_id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Clerk not found",
      });
    }

    const result = await pool.query(
      `
        UPDATE clerk
        SET 
        clerk_name = COALESCE($1, clerk_name),
        age = COALESCE($2, age),
        gender = COALESCE($3, gender),
        role = COALESCE($4, role),
        update_at = NOW()
        WHERE clerk_id = $5
        RETURNNING *;
        `,
      [clerk_name, age, gender, role, clerk_id]
    );

    res.status(200).json({
      status: "Success",
      message: "Clerk updated successfully",
      clerk: result.rows[0],
    });
  } catch (error) {
    console.error("Database update failed: ", error);
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
            DELETE FROM clerk_id WHERE clerk_id = $1 RETURNING *;
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
    console.error("Database delete failed: ", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

