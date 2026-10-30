// frontend/src/pages/FormulaPage.js
// Purpose: Redesigned formula revision page with gradient hero, 14 topic tiles, and rich formula cards with shimmer loading.
import React, { useState } from 'react';
import { TOPICS, TOPIC_COLORS, TopicIcon } from '../components/TopicIcons';

export default function FormulaPage() {
    const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // VIVA: Formula generation is strictly button-triggered to conserve the Gemini free-tier quota (no automatic API calls on page load or topic change)
    const fetchFormulas = async (topic) => {
        setLoading(true);
        setError('');
        setCards([]);
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

    const topicColor = TOPIC_COLORS[selectedTopic] || 'var(--accent)';

    return (
        <div className="formula-page">
            {/* ── Hero Banner ── */}
            <div
                className="formula-hero"
                style={{
                    background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)`
                }}
            >
                <div className="formula-hero__content">
                    <div className="formula-hero__text">
                        <h1 className="formula-hero__title">Formula Revision Library</h1>
                        <p className="formula-hero__desc">
                            Choose any of the 14 MBA-CET Quantitative topics, then generate 6 AI-powered formula cards to sharpen your exam readiness.
                        </p>
                    </div>
                    <div className="formula-hero__art" aria-hidden="true">
                        <TopicIcon topic={selectedTopic} size={96} color="rgba(255,255,255,0.25)" />
                    </div>
                </div>
            </div>

            <div className="container">
                {/* ── Topic Grid ── */}
                <h2 className="formula-section-title">Select a Topic</h2>
                <div className="topic-grid">
                    {TOPICS.map((topic) => {
                        const color = TOPIC_COLORS[topic];
                        const isSelected = topic === selectedTopic;
                        return (
                            <button
                                key={topic}
                                className={`topic-tile ${isSelected ? 'topic-tile--selected' : ''}`}
                                style={isSelected ? {
                                    borderColor: color,
                                    boxShadow: `0 0 0 2px ${color}40, 0 4px 16px ${color}30`,
                                } : {}}
                                onClick={() => {
                                    setSelectedTopic(topic);
                                    setCards([]);
                                    setError('');
                                }}
                            >
                                <span className="topic-tile__icon" style={{ color }}>
                                    <TopicIcon topic={topic} size={36} color={color} />
                                </span>
                                <span className="topic-tile__name">{topic}</span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Generate Button ── */}
                <div className="formula-cta">
                    <button
                        className="btn formula-gen-btn"
                        style={{ background: topicColor }}
                        onClick={() => fetchFormulas(selectedTopic)}
                        disabled={loading}
                    >
                        {loading
                            ? '⏳ Generating…'
                            : `✨ Generate Formulas for ${selectedTopic}`}
                    </button>
                </div>

                {error && <div style={{ color: '#ef4444', margin: '1rem 0' }}>{error}</div>}

                {/* ── Topic Header (shown after cards load) ── */}
                {(loading || cards.length > 0) && (
                    <div className="formula-topic-header">
                        <TopicIcon topic={selectedTopic} size={40} color={topicColor} />
                        <div>
                            <div className="formula-topic-header__name" style={{ color: topicColor }}>
                                {selectedTopic}
                            </div>
                            <div className="formula-topic-header__sub">6 key formulas to remember</div>
                        </div>
                    </div>
                )}

                {/* ── Shimmer Skeleton while loading ── */}
                {loading && (
                    <div className="card-grid formula-card-grid">
                        {Array.from({ length: 6 }, (_, i) => (
                            <div key={i} className="formula-card formula-card--shimmer">
                                <div className="shimmer-strip" />
                                <div className="shimmer-line shimmer-line--wide" />
                                <div className="shimmer-line" />
                                <div className="shimmer-eq" />
                                <div className="shimmer-line shimmer-line--narrow" />
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Formula Cards ── */}
                {!loading && cards.length > 0 && (
                    <div className="card-grid formula-card-grid">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="formula-card formula-card--rich"
                                style={{ '--topic-color': topicColor }}
                            >
                                {/* Coloured top strip */}
                                <div
                                    className="fcard__strip"
                                    style={{ background: topicColor }}
                                />
                                {/* Large faint card number */}
                                <div className="fcard__num">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                {/* Faint watermark icon */}
                                <div className="fcard__watermark" aria-hidden="true">
                                    <TopicIcon topic={selectedTopic} size={64} color={topicColor} />
                                </div>
                                {/* Content */}
                                <div className="fcard__body">
                                    <span className="card-tag fcard__tag" style={{ background: topicColor }}>
                                        {card.tag}
                                    </span>
                                    <h3 className="fcard__name">{card.name}</h3>
                                    <div
                                        className="formula-eq fcard__eq"
                                        style={{ color: topicColor, borderColor: `${topicColor}50` }}
                                    >
                                        {card.equation}
                                    </div>
                                    <p className="fcard__note">
                                        💡 {card.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
