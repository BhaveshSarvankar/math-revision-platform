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

export function ScoreBarChart({ history }) {
    // VIVA: Format recent 7 quiz scores in chronological order for Chart.js bar chart
    const chartData = {
        labels: history.slice(0, 7).reverse().map((item, idx) => `Attempt ${idx + 1} (${item.topic.slice(0, 8)}...)`),
        datasets: [{
            label: 'Quiz Score (%)',
            data: history.slice(0, 7).reverse().map(item => item.score),
            backgroundColor: 'rgba(59, 130, 246, 0.75)',
            borderColor: '#3b82f6',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { y: { min: 0, max: 100 } }
    };

    return (
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: 1, minWidth: '300px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📊 Recent Quiz Scores
            </h4>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export function ScoreTrendChart({ history }) {
    // VIVA: Transform chronological quiz attempt history into a score trend line chart to visualize performance trajectory over time
    const trendData = history.slice(0, 10).reverse();
    const chartData = {
        labels: trendData.map((item, idx) => `#${idx + 1} (${item.topic.slice(0, 6)}...)`),
        datasets: [{
            label: 'Score Trend (%)',
            data: trendData.map(item => item.score),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#10b981',
            pointRadius: 4
        }]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { y: { min: 0, max: 100 } }
    };

    return (
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flex: 1, minWidth: '300px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📈 Performance Trend Over Time
            </h4>
            <Line data={chartData} options={options} />
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
