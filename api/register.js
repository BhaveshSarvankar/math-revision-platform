// api/register.js
// Purpose: Handles student registration by hashing password and saving user in MySQL.
const db = require('./_db');
const bcrypt = require('bcryptjs');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // To change this query live, edit line 18
        // Returns: Array of existing users matching the email
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // VIVA: Salt and hash password with bcrypt (cost factor 10) before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // To change this query live, edit line 27
        // Returns: ResultSetHeader containing inserted user id
        await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
