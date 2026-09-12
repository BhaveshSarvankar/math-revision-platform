// api/formulas.js
// Purpose: Calls Google Gemini API backend-side to dynamically generate 6 formula cards per topic with database caching.
const { authenticateUser } = require('./_authMiddleware');
// VIVA: Import MySQL database pool for formula caching
const db = require('./_db');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const user = authenticateUser(req, res);
    if (!user) return;

    const { topic } = req.body || {};
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    // VIVA: Check formula_cache table first to return cached formulas and avoid hitting Gemini API free tier quota
    try {
        // To change this query live, edit line 19
        // Returns: Array of cached formula entries matching topic
        const [cached] = await db.query('SELECT formulas_json FROM formula_cache WHERE topic = ?', [topic]);
        if (cached && cached.length > 0) {
            // VIVA: Return cached formulas directly (parsed from JSON string), skipping Gemini API call
            const cards = JSON.parse(cached[0].formulas_json);
            return res.status(200).json({ topic, cards });
        }
    } catch (cacheErr) {
        // VIVA: Log cache query errors and fallback to live Gemini API call
        console.error('FORMULA CACHE FETCH ERROR:', cacheErr.message);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('FORMULA DEBUG: No Gemini API key found in environment variables');
        // VIVA: Fallback mock cards if API key is not configured during local testing
        return res.status(200).json({ topic, cards: getFallbackFormulas(topic) });
    }

    try {
        const prompt = `Generate exactly 6 formula revision cards for MAH-MBA-CET Quantitative Aptitude topic: "${topic}". Return ONLY a raw JSON array of 6 objects with keys: "tag", "name", "equation", "note". Write equations in PLAIN TEXT only (e.g. "% Change = (Difference / Original) x 100"), NOT LaTeX, NOT markdown, no backslashes, no special symbols like \\frac or \\times. No extra text outside the JSON array.`;

        // VIVA: Using Gemini 2.5 Flash - Google's genuinely free API tier, no credit card required
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,

            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();
        console.log('GEMINI API RAW RESPONSE:', JSON.stringify(data));

        // VIVA: Validate Gemini API response status and structure before parsing and caching
        if (!response.ok || data.error || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
            // VIVA: Skip cache save and throw error to fall back cleanly without saving bad/fallback data
            throw new Error(data.error?.message || `Gemini API returned status ${response.status}`);
        }

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json|```/g, '').trim(); // VIVA: strip markdown fences Gemini sometimes adds
        const cards = JSON.parse(text.substring(text.indexOf('['), text.lastIndexOf(']') + 1));

        // VIVA: Save to formula_cache ONLY when real Gemini API call succeeds and returns non-empty cards
        if (Array.isArray(cards) && cards.length > 0) {
            try {
                // To change this query live, edit line 71
                // Returns: ResultSetHeader containing inserted or updated cache record details
                await db.query(
                    'INSERT INTO formula_cache (topic, formulas_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE formulas_json = VALUES(formulas_json)',
                    [topic, JSON.stringify(cards)]
                );
            } catch (saveErr) {
                // VIVA: Log cache save error without failing the API response
                console.error('FORMULA CACHE SAVE ERROR:', saveErr.message);
            }
        }

        return res.status(200).json({ topic, cards });
    } catch (err) {
        console.error('FORMULA API ERROR:', err.message);
        return res.status(200).json({ topic, cards: getFallbackFormulas(topic) });
    }
};

function getFallbackFormulas(topic) {
    return Array.from({ length: 6 }, (_, i) => ({
        tag: `Concept ${i + 1}`,
        name: `${topic} Formula ${i + 1}`,
        equation: `Key Formula = Expression ${i + 1}`,
        note: `Important MBA-CET revision tip for ${topic} problem solving.`
    }));
}