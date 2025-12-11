import { Request, Response } from "express";
import { pool } from "../config/db.config.js";

export const index = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
            SELECT * FROM supplier
      `
    );

    res.status(200).json({
      status: "Success",
      suppliers: result.rows,
    });
  } catch (error) {
    console.error("Database query fields: ", error);
    res.status(500).json({
      status: "Errror",
      message: "Inetrnal Server Error",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  const { id: supplier_id } = req.params;

  if (!supplier_id) {
    return res.status(403).json({
      status: "Error",
      message: "Supplier ID is required",
    });
  }

  try {
    const { rows } = await pool.query(
      `
            SELECT * FROM 
            s.supplier_name,
            s.contact_info,
            s.address,
            s.created-at
            FROM supplier AS s
            WHERE s.supplier_id = $1
            `,
      [supplier_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      status: "Success",
      supplier: rows[0],
    });
  } catch (error) {
    console.error("Database query field: ", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const store = async (req: Request, res: Response) => {
  const requiredFields = [
    "supplier_name", 
    "contact_info", 
    "address"
];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "Error",
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  try {
  } catch (error) {
    
  }
};
