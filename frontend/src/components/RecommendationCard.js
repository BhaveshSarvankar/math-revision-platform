// frontend/src/components/RecommendationCard.js
// Purpose: Dashboard card that shows the AI-free rule-based "recommended next quiz" with topic icon, badge, and a CTA button.
import React from 'react';
import { TopicIcon, TOPIC_COLORS } from './TopicIcons';

const TYPE_META = {
    start:    { label: '🚀 Start Here',  bg: '#6366f1' },
    weak:     { label: '⚠️ Needs Work',  bg: '#ef4444' },
    new:      { label: '🌟 New Topic',   bg: '#10b981' },
    'level-up': { label: '⬆️ Level Up', bg: '#f59e0b' },
};

export default function RecommendationCard({ recommendation, onStart }) {
    if (!recommendation) return null;

    const { topic, difficulty, reason, type } = recommendation;
    const meta = TYPE_META[type] || TYPE_META['start'];
    const topicColor = TOPIC_COLORS[topic] || 'var(--accent)';

    const diffColor = difficulty === 'Easy' ? '#10b981' : difficulty === 'Medium' ? '#f59e0b' : '#ef4444';

    return (
        <div className="rec-card" style={{ borderTop: `4px solid ${topicColor}` }}>
            {/* Header row */}
            <div className="rec-card__header">
                <span className="rec-card__label">Recommended Next Quiz</span>
                <span
                    className="rec-card__badge"
                    style={{ background: meta.bg }}
                >
                    {meta.label}
                </span>
            </div>

            {/* Body */}
            <div className="rec-card__body">
                <div className="rec-card__icon" style={{ color: topicColor }}>
                    <TopicIcon topic={topic} size={52} color={topicColor} />
                </div>
                <div className="rec-card__info">
                    <div className="rec-card__topic">{topic}</div>
                    <span
                        className="card-tag rec-card__diff"
                        style={{ background: diffColor }}
                    >
                        {difficulty}
                    </span>
                    <p className="rec-card__reason">{reason}</p>
                </div>
            </div>

            {/* CTA */}
            <button
                className="btn rec-card__btn"
                style={{ background: topicColor }}
                onClick={() => onStart(topic, difficulty)}
            >
                Start this quiz →
            </button>
        </div>
    );
}
