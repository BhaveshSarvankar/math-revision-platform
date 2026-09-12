// frontend/src/pages/FormulaPage.js
// Purpose: Displays 6 AI-generated formula revision cards for selected MBA-CET topic.
import React, { useState } from 'react';

const TOPICS = [
    'Percentages', 'Profit, Loss & Discount', 'Simple & Compound Interest',
    'Time, Speed & Distance', 'Time & Work', 'Ratio, Proportion & Variation',
    'Averages', 'Number System', 'Permutations & Combinations', 'Probability',
    'Mensuration', 'Algebra', 'Data Interpretation', 'Data Sufficiency'
];

export default function FormulaPage() {
    const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // VIVA: Formula generation is strictly button-triggered to conserve the Gemini free-tier quota (no automatic API calls on page load or topic change)


    const fetchFormulas = async (topic) => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Session expired. Please log in again.');

            const res = await fetch('/api/formulas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // VIVA: Send JWT token in Authorization header
                },
                body: JSON.stringify({ topic })
            });

            if (res.status === 401 || res.status === 403) {
                throw new Error('Session expired. Please log in again.');
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to fetch formulas');
            setCards(data.cards || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Formula Revision Library</h1>
            <div className="form-group" style={{ maxWidth: '800px', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                    <label>Select MAH-MBA-CET Quantitative Topic:</label>
                    <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                        {TOPICS.map((topic) => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>
                <button className="btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={() => fetchFormulas(selectedTopic)} disabled={loading}>
                    {loading ? 'Loading...' : 'Generate Formulas'}
                </button>
            </div>

            {error && <div style={{ color: '#ef4444', margin: '1rem 0' }}>{error}</div>}

            {loading ? (
                <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem' }}>Generating live AI formula cards via Gemini API...</p>
            ) : (
                <div className="card-grid">
                    {cards.map((card, idx) => (
                        <div className="formula-card" key={idx}>
                            <span className="card-tag">{card.tag}</span>
                            <h3 style={{ margin: '0.5rem 0' }}>{card.name}</h3>
                            <div className="formula-eq">{card.equation}</div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{card.note}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
