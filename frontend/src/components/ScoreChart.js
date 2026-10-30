// frontend/src/components/ScoreChart.js
// Purpose: Renders Chart.js Bar and Line charts for student quiz scores and performance trends.
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// VIVA: Helper to format date as "30 Oct"
function fmtDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export function ScoreBarChart({ history }) {
    // VIVA: Format all quiz scores in chronological order for Chart.js bar chart
    const sorted = [...history].reverse();

    const chartData = {
        labels: sorted.map((item) => `${item.topic.slice(0, 9)}… ${fmtDate(item.created_at)}`),
        datasets: [{
            label: 'Quiz Score (%)',
            data: sorted.map(item => item.score),
            // VIVA: Green bar for ≥70% (pass), amber for <70% (fail)
            backgroundColor: sorted.map(item =>
                item.score >= 70 ? 'rgba(16, 185, 129, 0.82)' : 'rgba(245, 158, 11, 0.82)'
            ),
            borderColor: sorted.map(item =>
                item.score >= 70 ? '#10b981' : '#f59e0b'
            ),
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items) => {
                        const item = sorted[items[0].dataIndex];
                        return `${item.topic}`;
                    },
                    label: (item) => {
                        const d = sorted[item.dataIndex];
                        return [
                            `  Score    : ${d.score}%`,
                            `  Level    : ${d.difficulty}`,
                            `  Correct  : ${d.correct_answers}/${d.total_questions}`,
                            `  Date     : ${fmtDate(d.created_at)}`,
                        ];
                    },
                    labelColor: (item) => ({
                        backgroundColor: sorted[item.dataIndex].score >= 70 ? '#10b981' : '#f59e0b',
                        borderColor: 'transparent',
                        borderRadius: 3,
                    })
                },
                backgroundColor: 'rgba(15,23,42,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: { color: 'var(--text-muted)', callback: v => `${v}%` },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
            x: {
                ticks: {
                    color: 'var(--text-muted)',
                    maxRotation: 40,
                    font: { size: 10 }
                },
                grid: { display: false }
            }
        }
    };

    // VIVA: Badge counts for pass/fail summary
    const passed = sorted.filter(i => i.score >= 70).length;
    const failed = sorted.length - passed;

    return (
        <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '14px',
            border: '1px solid var(--border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            flex: 1,
            minWidth: '300px'
        }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📊 All Quiz Scores
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid #10b981', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem', fontWeight: 600 }}>
                        ✓ {passed} Passed
                    </span>
                    <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid #f59e0b', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem', fontWeight: 600 }}>
                        ✗ {failed} Below 70%
                    </span>
                </div>
            </div>

            {/* Legend dots */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10b981', display: 'inline-block' }} /> ≥ 70% Pass
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b', display: 'inline-block' }} /> &lt; 70% Improve
                </span>
            </div>

            <Bar data={chartData} options={options} />
        </div>
    );
}

export function ScoreTrendChart({ history }) {
    // VIVA: Transform all quiz attempt history into a score trend line chart to visualize full performance trajectory over time
    const trendData = [...history].reverse();

    const chartData = {
        labels: trendData.map((item) => `${item.topic.slice(0, 7)}… ${fmtDate(item.created_at)}`),
        datasets: [{
            label: 'Score Trend (%)',
            data: trendData.map(item => item.score),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: trendData.map(i => i.score >= 70 ? '#10b981' : '#f59e0b'),
            pointBorderColor: trendData.map(i => i.score >= 70 ? '#10b981' : '#f59e0b'),
            pointRadius: 5,
            pointHoverRadius: 7,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items) => trendData[items[0].dataIndex].topic,
                    label: (item) => {
                        const d = trendData[item.dataIndex];
                        return [
                            `  Score   : ${d.score}%`,
                            `  Level   : ${d.difficulty}`,
                            `  Date    : ${fmtDate(d.created_at)}`,
                        ];
                    },
                },
                backgroundColor: 'rgba(15,23,42,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: { color: 'var(--text-muted)', callback: v => `${v}%` },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
            x: {
                ticks: {
                    color: 'var(--text-muted)',
                    maxRotation: 40,
                    font: { size: 10 }
                },
                grid: { display: false }
            }
        }
    };

    return (
        <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '14px',
            border: '1px solid var(--border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            flex: 1,
            minWidth: '300px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📈 Performance Trend Over Time
                </h4>
                {trendData.length > 0 && (
                    <span style={{
                        background: 'rgba(16,185,129,0.1)',
                        color: '#10b981',
                        border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: '20px',
                        padding: '2px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                    }}>
                        {trendData.length} attempts
                    </span>
                )}
            </div>

            {/* 70% threshold hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                <span style={{ width: 24, height: 2, background: '#ef4444', display: 'inline-block', borderRadius: 2 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>70% pass threshold</span>
            </div>

            <Line data={chartData} options={{
                ...options,
                plugins: {
                    ...options.plugins,
                    annotation: undefined,
                }
            }} />
        </div>
    );
}

export default function ScoreChart({ history }) {
    return (
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <ScoreBarChart history={history} />
            <ScoreTrendChart history={history} />
        </div>
    );
}
