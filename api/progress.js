// api/progress.js
// Purpose: Calculates student progress metrics, performance matrix, and recommended next quiz for the dashboard.
const db = require('./_db');
const { authenticateUser } = require('./_authMiddleware');

// The 14 canonical MBA-CET topics in order
const ALL_TOPICS = [
    'Percentages', 'Profit, Loss & Discount', 'Simple & Compound Interest',
    'Time, Speed & Distance', 'Time & Work', 'Ratio, Proportion & Variation',
    'Averages', 'Number System', 'Permutations & Combinations', 'Probability',
    'Mensuration', 'Algebra', 'Data Interpretation', 'Data Sufficiency'
];

/**
 * Rule-based recommendation engine (no ML).
 * Returns { topic, difficulty, reason, type }
 */
function computeRecommendation(matrix) {
    // Rule a: No attempts at all → start with Percentages Easy
    if (matrix.length === 0) {
        return {
            topic: 'Percentages',
            difficulty: 'Easy',
            reason: 'Start your journey with the most fundamental topic!',
            type: 'start'
        };
    }

    // Build a map: topic -> { avgScore, totalAttempts, difficulties: { Easy, Medium, Hard } -> avgScore }
    const topicMap = {};
    for (const row of matrix) {
        if (!topicMap[row.topic]) {
            topicMap[row.topic] = { totalAttempts: 0, weightedScore: 0, difficulties: {} };
        }
        topicMap[row.topic].totalAttempts += Number(row.attempts);
        topicMap[row.topic].weightedScore += Number(row.avg_score) * Number(row.attempts);
        topicMap[row.topic].difficulties[row.difficulty] = Number(row.avg_score);
    }

    // Compute weighted average per topic
    for (const topic of Object.keys(topicMap)) {
        const t = topicMap[topic];
        t.avgScore = t.weightedScore / t.totalAttempts;
    }

    // Rule b: Find weakest topic below 70%
    let weakestTopic = null;
    let weakestScore = Infinity;
    for (const [topic, data] of Object.entries(topicMap)) {
        if (data.avgScore < 70 && data.avgScore < weakestScore) {
            weakestScore = data.avgScore;
            weakestTopic = topic;
        }
    }
    if (weakestTopic) {
        // Find the difficulty where this topic scored lowest
        const diffs = topicMap[weakestTopic].difficulties;
        const diffOrder = ['Easy', 'Medium', 'Hard'];
        let weakestDiff = 'Easy';
        let lowestDiffScore = Infinity;
        for (const diff of diffOrder) {
            if (diffs[diff] !== undefined && diffs[diff] < lowestDiffScore) {
                lowestDiffScore = diffs[diff];
                weakestDiff = diff;
            }
        }
        return {
            topic: weakestTopic,
            difficulty: weakestDiff,
            reason: `Your average score in this topic is ${Math.round(weakestScore)}% — below 70%. Focus here to improve!`,
            type: 'weak'
        };
    }

    // Rule c: All attempted topics ≥ 70%, check for untried topics
    const attemptedTopics = new Set(Object.keys(topicMap));
    const untriedTopic = ALL_TOPICS.find(t => !attemptedTopics.has(t));
    if (untriedTopic) {
        return {
            topic: untriedTopic,
            difficulty: 'Easy',
            reason: "You're doing great! Expand your skills by trying a new topic.",
            type: 'new'
        };
    }

    // Rule d: All topics attempted and all ≥ 70% — level up on best topic
    let bestTopic = null;
    let bestScore = -Infinity;
    for (const [topic, data] of Object.entries(topicMap)) {
        if (data.avgScore > bestScore) {
            bestScore = data.avgScore;
            bestTopic = topic;
        }
    }
    // Find the highest difficulty already attempted for the best topic
    const bestDiffs = topicMap[bestTopic].difficulties;
    let currentHighestDiff = 'Easy';
    if (bestDiffs['Hard'] !== undefined) currentHighestDiff = 'Hard';
    else if (bestDiffs['Medium'] !== undefined) currentHighestDiff = 'Medium';
    // Level up: Easy→Medium, anything else→Hard
    const nextDiff = currentHighestDiff === 'Easy' ? 'Medium' : 'Hard';
    return {
        topic: bestTopic,
        difficulty: nextDiff,
        reason: `You've mastered all topics! Push yourself with a harder challenge in your best topic (${Math.round(bestScore)}% avg).`,
        type: 'level-up'
    };
}

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = authenticateUser(req, res);
    if (!user) return;

    try {
        // To change this query live, edit line below
        // Returns: All quiz attempts for student history table & trend chart (all-time)
        const [history] = await db.query(
            'SELECT id, topic, difficulty, score, correct_answers, total_questions, created_at FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC',
            [user.id]
        );

        // To change this query live, edit line below
        // Returns: Overall stats (total quizzes, average accuracy)
        const [stats] = await db.query(
            'SELECT COUNT(*) as total_quizzes, COALESCE(ROUND(AVG(score)), 0) as avg_accuracy FROM quiz_results WHERE user_id = ?',
            [user.id]
        );

        // To change this query live, edit line below
        // Returns: Topic with highest average score for best-topic card
        const [bestTopicRow] = await db.query(
            'SELECT topic, ROUND(AVG(score)) as avg_score FROM quiz_results WHERE user_id = ? GROUP BY topic ORDER BY avg_score DESC LIMIT 1',
            [user.id]
        );

        // FEATURE 1: Performance matrix - topic × difficulty breakdown for the heatmap table
        const [matrixRows] = await db.query(
            'SELECT topic, difficulty, ROUND(AVG(score)) AS avg_score, COUNT(*) AS attempts FROM quiz_results WHERE user_id = ? GROUP BY topic, difficulty',
            [user.id]
        );

        const summary = {
            totalQuizzes: stats[0].total_quizzes || 0,
            avgAccuracy: stats[0].avg_accuracy || 0,
            bestTopic: bestTopicRow.length > 0 ? bestTopicRow[0].topic : 'None'
        };

        // Compute rule-based recommendation
        const recommendation = computeRecommendation(matrixRows);

        return res.status(200).json({ summary, history, matrix: matrixRows, recommendation });
    } catch (error) {
        return res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
