import { Request, Response } from 'express'
import { pool } from '../config/db.config.js'

export const index = async (req: Request, res: Response) => {
   
    try {
        
        const result = await pool.query(`
            SELECT * FROM clerk;
            `);

            res.status(200).json({
                status: "Success",
                clerks: result.rows
            });
        
    } catch (error) {
        console.error("Database query fields: ", error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        });
    }

}

export const show = async (req:Request, res: Response) => {
    const { id: clerk_id}  = req.params

    if (!clerk_id) {
        return res.status(403).json({
            status: "Error",
            message: "Clerk ID is required"
        });
    }

    try {
        
        const { rows } = await pool.query(`
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
                status: 'Error',
                messsage: 'Clerk not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            clerk: rows[0]
        });

    } catch (error) {
        console.error("Database query fields: ", error)
        res.status(500).json({
            status: 'Error',
            message: 'Internam Server Error'
        });
    }
}

export const update = async (req:Request, res:Response) => {
    
}
