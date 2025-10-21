import { Request, Response } from "express";
import { pool } from "../config/db.config.js";

export const index = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
            SELECT * FROM category
        `);

    res.status(200).json({
      status: "Success",
      categories: result.rows,
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
  const { id: category_id } = req.params;

  if (!category_id) {
    return res.status(403).json({
      status: "Error",
      message: "Category ID is required",
    });
  }

  try {
    const { rows } = await pool.query(
      `
            SELECT * FROM 
            c.category_id,
            c.category_name,
            c.description,
            c.created_at
            FROM category AS c
            WHERE c.category_id = $1
            `,
      [category_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "Success",
      category: rows[0],
    });
  } catch (error) {
    console.error("Database query fields: ", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const store = async (req: Request, res: Response) => {
  const { category_name, description } = req.body;

  if (!category_name) {
    return res.status(400).json({
      status: "Error",
      message: "Category name is required",
    });
  }

  if (!description) {
    return res.status(400).json({
      status: "Error",
      message: "Description is required",
    });
  }

  try {
    const result = await pool.query(
      `
            INSERT INTO category(category_name, description)
            VALUES ($1, $2)
            RETURNING *;
            `,
      [category_name, description || null]
    );

    res.status(201).json({
      status: "Success",
      message: "Category created successfully",
      category: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting query; ", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id: category_id } = req.params;
  const { category_name, description } = req.body;

  if (!category_id) {
    return res.status(403).json({
      status: "Error",
      message: "Category ID is required",
    });
  }

  try {
    const existing = await pool.query(
      `
        SELECT * FROM  category WHERE category_id = $1
        `,
      [category_id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }

    const result = await pool.query(
      `
        UPDATE category 
        SET 
        category_name = COALESCE($1, category_name),
        description = COALESCE($2, description),
        update_at = NOW()
        WHERE category_id = $3
        RETURNING *;
        `,
      [category_name, description]
    );

    res.status(200).json({
      status: "Success",
      message: "Category updated successfully",
      category: result.rows[0],
    });
  } catch (error) {
    console.error("Database update failed", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id: category_id } = req.params;

  if (category_id) {
    return res.status(400).json({
      status: "Error",
      message: "Category ID is required",
    });
  }

  try {
    const result = await pool.query(
      `
        DELETE FROM category_id WHERE category_id = $1 RETURNING *;
        `,
      [category_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Category deleted successfully",
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Database delete failed: ", error);
    res.status(500).json({
      status: "Error",
      message: "Inernal Server Error",
    });
  }
};
