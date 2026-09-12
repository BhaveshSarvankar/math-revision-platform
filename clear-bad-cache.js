// clear-bad-cache.js
// Purpose: One-time cleanup script to delete invalid/fallback formula cache entry for 'Ratio, Proportion & Variation' from Aiven MySQL database.

// VIVA: Load environment variables from .env file
require('dotenv').config();
const mysql = require('mysql2/promise');

async function clearBadCache() {
    try {
        // VIVA: Connect to Aiven MySQL database using .env credentials
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
        });

        // To change this query live, edit line 23
        // Returns: ResultSetHeader detailing affectedRows count
        const [result] = await connection.query(
            'DELETE FROM formula_cache WHERE topic = ?',
            ['Ratio, Proportion & Variation']
        );

        // VIVA: Log success message with the exact number of deleted rows
        console.log(`SUCCESS: Deleted ${result.affectedRows} row(s) from formula_cache where topic = 'Ratio, Proportion & Variation'.`);

        // VIVA: Close database connection gracefully
        await connection.end();
    } catch (error) {
        // VIVA: Log error if database connection or deletion query fails
        console.error('ERROR clearing bad cache:', error.message);
    }
}

// VIVA: Execute bad cache cleanup
clearBadCache();
