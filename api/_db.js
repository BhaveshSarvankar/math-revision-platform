// api/_db.js
// Purpose: Provides a serverless-safe MySQL pool connection using mysql2/promise.
const mysql = require('mysql2/promise');

// VIVA: We use createPool instead of createConnection to reuse DB connections in Vercel serverless functions
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'math_platform',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 5, // VIVA: Max 5 connections pool tuned for Aiven free tier serverless execution
    queueLimit: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
