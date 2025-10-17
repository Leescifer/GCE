import { Request, Response } from 'express'
import { pool } from '../config/db.config.js'

export const index = async (req: Request, res: Response) => {
   
    try {
        
        const result = await pool.query(`
            SELECT * FROM clerk;
            `);

            res.status(200).json({
                status: "Success",
                clerk: result.rows
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
    const {id: clerk_id} = req.params

    if (!clerk_id) {
        return res.status(403).json({
            status: "Error",
            message: "Clerk ID is required"
        });
    }

    try {
        
        const result = await pool.query(`
            
            `)
    } catch (error) {
        
    }
}
