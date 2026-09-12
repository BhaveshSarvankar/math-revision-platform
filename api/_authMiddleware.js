// api/_authMiddleware.js
// Purpose: Validates incoming JWT tokens from request Authorization headers.
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_2026';

// VIVA: Helper function for Vercel serverless functions to authenticate protected routes
function authenticateUser(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return null;
    }

    const token = authHeader.split(' ')[1]; // VIVA: Extract token string after 'Bearer '
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // VIVA: Attach decoded user object { id, email, name } to request
        return decoded;
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
        return null;
    }
}

module.exports = { authenticateUser, JWT_SECRET };
