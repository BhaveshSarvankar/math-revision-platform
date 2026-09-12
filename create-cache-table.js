// create-cache-table.js
// Purpose: Connects to Aiven MySQL database and executes add_formula_cache.sql to create formula_cache table.

// VIVA: Load environment variables from .env file
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function createCacheTable() {
    try {
        // VIVA: Establish connection to Aiven MySQL database using .env credentials
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
        });

        // VIVA: Read the SQL schema file for formula_cache table
        const sqlFilePath = path.join(__dirname, 'add_formula_cache.sql');
        const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

        // To change this query live, edit add_formula_cache.sql or line 27
        // Returns: ResultSetHeader confirming formula_cache table creation
        await connection.query(sqlQuery);

        // VIVA: Log success message after table creation
        console.log('SUCCESS: formula_cache table created successfully!');

        // VIVA: Close database connection gracefully
        await connection.end();
    } catch (error) {
        // VIVA: Log error if database connection or query execution fails
        console.error('ERROR creating formula_cache table:', error.message);
    }
}

// VIVA: Run the table creation script
createCacheTable();
