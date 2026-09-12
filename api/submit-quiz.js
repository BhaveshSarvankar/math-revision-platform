// api/submit-quiz.js
// Purpose: Evaluates quiz attempt, saves score in MySQL, and returns adaptive next difficulty.
const db = require('./_db');
const { authenticateUser } = require('./_authMiddleware');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = authenticateUser(req, res);
    if (!user) return;

    const { topic, difficulty, total_questions, correct_answers } = req.body || {};
    if (!topic || !difficulty || total_questions === undefined || correct_answers === undefined) {
        return res.status(400).json({ error: 'Missing required quiz submission fields' });
    }

    const scorePercentage = Math.round((correct_answers / total_questions) * 100);

    // VIVA: Adaptive Difficulty logic - simple if/else without machine learning
    let nextDifficulty = difficulty;
    if (scorePercentage > 70) {
        if (difficulty === 'Easy') nextDifficulty = 'Medium';
        else if (difficulty === 'Medium') nextDifficulty = 'Hard';
        else nextDifficulty = 'Hard';
    }

    try {
        // To change this query live, edit line 31
        // Returns: ResultSetHeader of saved quiz result
        await db.query(
            'INSERT INTO quiz_results (user_id, topic, difficulty, score, total_questions, correct_answers) VALUES (?, ?, ?, ?, ?, ?)',
            [user.id, topic, difficulty, scorePercentage, total_questions, correct_answers]
        );

        return res.status(200).json({
            message: 'Quiz submitted successfully',
            score: scorePercentage,
            correct_answers,
            total_questions,
            nextDifficulty
        });
    } catch (error) {
        return res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
