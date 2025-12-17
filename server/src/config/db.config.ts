import pg from 'pg';
import dotenv from 'dotenv';
import color from '@colors/colors';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5600,
    password: process.env.DB_PASSWORD,
});

export const initDB = async () => {

    try {

        const res = await pool.query('SELECT NOW()');

        console.log(
            color.blue.bold(
                `Database Connected: ${JSON.stringify(res.rows[0])}`
            )
        );

    } catch (error) {

        console.error(
            color.red(`Error connecting to the database error: ${error}`)
        );

    }

}

