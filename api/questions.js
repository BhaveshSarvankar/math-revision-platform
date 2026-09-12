// api/questions.js
// Purpose: Fetches 3 quiz questions based on topic and difficulty level.
const db = require('./_db');
const { authenticateUser } = require('./_authMiddleware');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // VIVA: Protected route check - returns 401 if unauthorized
    const user = authenticateUser(req, res);
    if (!user) return;

    const { topic, difficulty } = req.query || {};
    if (!topic || !difficulty) {
        return res.status(400).json({ error: 'Topic and difficulty query parameters are required' });
    }

    try {
        // To change this query live, edit line 23
        // Returns: Array of 3 questions filtered by topic and difficulty level
        const [questions] = await db.query(
            'SELECT id, topic, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation FROM questions WHERE topic = ? AND difficulty = ? LIMIT 3',
            [topic, difficulty]
        );

        return res.status(200).json({ questions });
    } catch (error) {
        return res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
