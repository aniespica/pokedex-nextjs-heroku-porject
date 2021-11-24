import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

export const db = new Pool({
    connectionString:DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})