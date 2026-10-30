// frontend/src/components/PerformanceMatrix.js
// Purpose: Topic × Difficulty heatmap table with colour-coded cells, tooltips, topic icons, and a colour legend.
import React, { useState } from 'react';
import { TOPICS, TopicIcon, TOPIC_COLORS } from './TopicIcons';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function cellColor(avg) {
    if (avg === null) return null;
    if (avg < 40) return '#ef4444';   // red
    if (avg < 70) return '#f59e0b';   // amber
    return '#10b981';                  // green
}

function cellBg(avg) {
    if (avg === null) return 'transparent';
    if (avg < 40) return 'rgba(239,68,68,0.12)';
    if (avg < 70) return 'rgba(245,158,11,0.12)';
    return 'rgba(16,185,129,0.12)';
}

export default function PerformanceMatrix({ matrix }) {
    const [tooltip, setTooltip] = useState(null); // { topic, difficulty, x, y }

    // Build lookup: matrix[topic][difficulty] = { avg_score, attempts }
    const lookup = {};
    if (matrix) {
        for (const row of matrix) {
            if (!lookup[row.topic]) lookup[row.topic] = {};
            lookup[row.topic][row.difficulty] = {
                avg: Number(row.avg_score),
                attempts: Number(row.attempts),
            };
        }
    }

    const handleMouseEnter = (e, topic, diff) => {
        const cell = lookup[topic]?.[diff];
        if (!cell) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            topic, diff,
            avg: cell.avg,
            attempts: cell.attempts,
            x: rect.left + rect.width / 2,
            y: rect.top - 8,
        });
    };

    const handleMouseLeave = () => setTooltip(null);

    return (
        <div className="pm-wrapper">
            <div className="pm-header">
                <h3 className="pm-title">📊 Performance Matrix</h3>
                <div className="pm-legend">
                    <span className="pm-legend__dot" style={{ background: '#10b981' }} /> ≥70% &nbsp;
                    <span className="pm-legend__dot" style={{ background: '#f59e0b' }} /> 40–69% &nbsp;
                    <span className="pm-legend__dot" style={{ background: '#ef4444' }} /> &lt;40% &nbsp;
                    <span className="pm-legend__dot pm-legend__dot--dash" /> Not tried
                </div>
            </div>

            <div className="pm-scroll">
                <table className="pm-table">
                    <thead>
                        <tr>
                            <th className="pm-table__topic-head">Topic</th>
                            {DIFFICULTIES.map(d => (
                                <th key={d} className="pm-table__diff-head">{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TOPICS.map(topic => (
                            <tr key={topic} className="pm-table__row">
                                <td className="pm-table__topic-cell">
                                    <span style={{ color: TOPIC_COLORS[topic], flexShrink: 0 }}>
                                        <TopicIcon topic={topic} size={22} color={TOPIC_COLORS[topic]} />
                                    </span>
                                    <span className="pm-table__topic-name">{topic}</span>
                                </td>
                                {DIFFICULTIES.map(diff => {
                                    const cell = lookup[topic]?.[diff] || null;
                                    const avg = cell ? cell.avg : null;
                                    const color = cellColor(avg);
                                    const bg = cellBg(avg);
                                    return (
                                        <td
                                            key={diff}
                                            className={`pm-table__cell ${avg === null ? 'pm-table__cell--empty' : ''}`}
                                            style={avg !== null ? { background: bg, color } : {}}
                                            onMouseEnter={e => handleMouseEnter(e, topic, diff)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {avg !== null ? (
                                                <>
                                                    <span className="pm-cell__score">{avg}%</span>
                                                    <span className="pm-cell__attempts">{cell.attempts}×</span>
                                                </>
                                            ) : (
                                                <span className="pm-cell__empty">—</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tooltip – rendered outside the table to avoid overflow clipping */}
            {tooltip && (
                <div
                    className="pm-tooltip"
                    style={{
                        position: 'fixed',
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translate(-50%, -100%)',
                        pointerEvents: 'none',
                    }}
                >
                    <strong>{tooltip.topic}</strong> · {tooltip.diff}<br />
                    Avg: <b>{tooltip.avg}%</b> over <b>{tooltip.attempts}</b> attempt{tooltip.attempts !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
}
