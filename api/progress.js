// api/progress.js
// Purpose: Calculates student progress metrics and returns quiz history for Chart.js dashboard.
const db = require('./_db');
const { authenticateUser } = require('./_authMiddleware');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = authenticateUser(req, res);
    if (!user) return;

    try {
        // To change this query live, edit line 18
        // Returns: Last 7 quiz attempts for student history table & bar chart
        const [history] = await db.query(
            'SELECT id, topic, difficulty, score, correct_answers, total_questions, created_at FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 7',
            [user.id]
        );

        // To change this query live, edit line 25
        // Returns: Overall stats (total quizzes, average accuracy)
        const [stats] = await db.query(
            'SELECT COUNT(*) as total_quizzes, COALESCE(ROUND(AVG(score)), 0) as avg_accuracy FROM quiz_results WHERE user_id = ?',
            [user.id]
        );

        // To change this query live, edit line 32
        // Returns: Topic with highest average score for best-topic card
        const [bestTopicRow] = await db.query(
            'SELECT topic, ROUND(AVG(score)) as avg_score FROM quiz_results WHERE user_id = ? GROUP BY topic ORDER BY avg_score DESC LIMIT 1',
            [user.id]
        );

        const summary = {
            totalQuizzes: stats[0].total_quizzes || 0,
            avgAccuracy: stats[0].avg_accuracy || 0,
            bestTopic: bestTopicRow.length > 0 ? bestTopicRow[0].topic : 'None'
        };

        return res.status(200).json({ summary, history });
    } catch (error) {
        return res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
