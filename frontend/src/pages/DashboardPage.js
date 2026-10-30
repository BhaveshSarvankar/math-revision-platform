// frontend/src/pages/DashboardPage.js
// Purpose: Student performance dashboard displaying recommendation card, summary cards, performance matrix, score chart, and quiz history table.
import React, { useState, useEffect } from 'react';
import ScoreChart from '../components/ScoreChart';
import RecommendationCard from '../components/RecommendationCard';
import PerformanceMatrix from '../components/PerformanceMatrix';

export default function DashboardPage({ onStartRecommended }) {
    const [summary, setSummary] = useState({ totalQuizzes: 0, avgAccuracy: 0, bestTopic: 'None' });
    const [history, setHistory] = useState([]);
    const [matrix, setMatrix] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/progress', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to load progress data');
                setSummary(data.summary || {});
                setHistory(data.history || []);
                setMatrix(data.matrix || []);
                setRecommendation(data.recommendation || null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, []);

    // VIVA: Color map helper for table difficulty tags
    const getDifficultyColor = (diff) => {
        if (diff === 'Easy') return '#10b981';
        if (diff === 'Medium') return '#f59e0b';
        if (diff === 'Hard') return '#ef4444';
        return '#3b82f6';
    };

    if (loading) return <div className="container" style={{ color: 'var(--text-muted)' }}>Loading performance dashboard...</div>;
    if (error) return <div className="container" style={{ color: '#ef4444' }}>{error}</div>;

    return (
        <div className="container">
            <h1 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>📊 Performance Dashboard</h1>

            {/* FEATURE 1: Recommendation Card */}
            <RecommendationCard
                recommendation={recommendation}
                onStart={onStartRecommended}
            />

            {/* Stat Cards */}
            <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        📝 Total Quizzes Taken
                    </div>
                    <div className="stat-value">{summary.totalQuizzes}</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        🎯 Average Score
                    </div>
                    <div className="stat-value" style={{ color: 'var(--accent-secondary)' }}>{summary.avgAccuracy}%</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        🏆 Strongest Topic
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.2rem', color: '#d97706', marginTop: '0.25rem' }}>{summary.bestTopic}</div>
                </div>
            </div>

            {/* FEATURE 2: Performance Matrix – always visible */}
            <PerformanceMatrix matrix={matrix} />

            {history.length === 0 ? (
                <div className="auth-box" style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No quiz attempts yet — go take a quiz!</p>
                </div>
            ) : (
                <>
                    <ScoreChart history={history} />

                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>📋 All Quiz Attempts</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Topic</th>
                                    <th>Difficulty</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((row, idx) => (
                                    <tr key={row.id} style={{ background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-input)' }}>
                                        <td style={{ fontWeight: '500' }}>
                                            <span style={{ display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--border)', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '600' }}>
                                                {row.topic}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="card-tag" style={{ background: getDifficultyColor(row.difficulty) }}>
                                                {row.difficulty}
                                            </span>
                                        </td>
                                        <td>
                                            <strong style={{ color: row.score >= 70 ? '#10b981' : '#f59e0b' }}>
                                                {row.score}%
                                            </strong>
                                        </td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                            {new Date(row.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
