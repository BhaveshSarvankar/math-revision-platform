// frontend/src/pages/QuizPage.js
// Purpose: Interactive timed quiz component with adaptive difficulty feedback.
import React, { useState } from 'react';
import Timer from '../components/Timer';

const TOPICS = [
    'Percentages', 'Profit, Loss & Discount', 'Simple & Compound Interest',
    'Time, Speed & Distance', 'Time & Work', 'Ratio, Proportion & Variation',
    'Averages', 'Number System', 'Permutations & Combinations', 'Probability',
    'Mensuration', 'Algebra', 'Data Interpretation', 'Data Sufficiency'
];

export default function QuizPage() {
    const [topic, setTopic] = useState(TOPICS[0]);
    const [difficulty, setDifficulty] = useState('Easy');
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // VIVA: Color map for difficulty badge tags
    const getDifficultyColor = (diff) => {
        if (diff === 'Easy') return '#10b981';
        if (diff === 'Medium') return '#f59e0b';
        if (diff === 'Hard') return '#ef4444';
        return '#3b82f6';
    };

    const startQuiz = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/questions?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to load questions');
            setQuestions(data.questions || []);
            setCurrentIndex(0);
            setUserAnswers({});
            setQuizFinished(false);
            setResult(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectOption = (opt) => {
        setUserAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
    };

    const handleNext = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // VIVA: Calculate correct answers and submit results to backend
            let correct = 0;
            questions.forEach((q, idx) => {
                if (userAnswers[idx] === q.correct_option) correct++;
            });

            const token = localStorage.getItem('token');
            const res = await fetch('/api/submit-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ topic, difficulty, total_questions: questions.length, correct_answers: correct })
            });
            const resData = await res.json();
            setResult(resData);
            setQuizFinished(true);
        }
    };

    if (questions.length === 0) return (
        <div className="container auth-box" style={{ maxWidth: '650px' }}>
            <h2>🎯 Start Timed Quiz</h2>
            {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
            <div className="form-group">
                <label>Select Practice Topic:</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label>Initial Difficulty Level:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <button className="btn" onClick={startQuiz} disabled={loading}>
                {loading ? 'Loading Questions...' : '🚀 Begin Timed Quiz'}
            </button>
        </div>
    );

    if (quizFinished) return (
        <div className="container quiz-card" style={{ maxWidth: '1050px', margin: '2rem auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}>🎉 Quiz Results Summary</h2>
            
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1.5rem' }}>
                <div className="stat-card">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Final Score</div>
                    <div className="stat-value" style={{ color: (result?.score || 0) >= 70 ? '#10b981' : '#f59e0b' }}>
                        {result?.score}%
                    </div>
                </div>
                <div className="stat-card">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Accuracy</div>
                    <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>
                        {result?.correct_answers} / {result?.total_questions}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct Answers</div>
                </div>
                <div className="stat-card">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Adaptive Target</div>
                    <div className="stat-value" style={{ fontSize: '1.2rem', color: getDifficultyColor(result?.nextDifficulty) }}>
                        {result?.nextDifficulty}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next Level</div>
                </div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    💡 <strong>Adaptive Suggestion:</strong> Based on your performance in <em>{topic}</em>, your next recommended difficulty level is{' '}
                    <span className="card-tag" style={{ background: getDifficultyColor(result?.nextDifficulty) }}>
                        {result?.nextDifficulty}
                    </span>.
                </p>
            </div>

            <button className="btn" onClick={() => setQuestions([])}>
                🔄 Take Another Quiz
            </button>
        </div>
    );

    const currentQ = questions[currentIndex];
    return (
        <div className="container quiz-card" style={{ maxWidth: '1050px', margin: '2rem auto' }}>
            <Timer questionIndex={currentIndex} onTimeUp={handleNext} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                    Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="card-tag" style={{ background: getDifficultyColor(currentQ.difficulty) }}>
                    {currentQ.difficulty}
                </span>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--input-border)', marginBottom: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.5' }}>
                    {currentQ.question_text}
                </p>
            </div>

            <div className="options-grid">
                {['A', 'B', 'C', 'D'].map((opt) => {
                    const isSelected = userAnswers[currentIndex] === opt;
                    return (
                        <button
                            key={opt}
                            className={`option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(opt)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--input-border)',
                                background: isSelected ? 'var(--bg-card)' : 'var(--bg-input)',
                                color: isSelected ? 'var(--accent)' : 'var(--text-main)',
                                fontWeight: isSelected ? '600' : 'normal',
                                transition: '0.2s'
                            }}
                        >
                            <span style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isSelected ? 'var(--accent)' : 'var(--border)',
                                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                                fontWeight: 'bold',
                                fontSize: '0.85rem'
                            }}>
                                {opt}
                            </span>
                            <span style={{ flex: 1 }}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                            {isSelected && <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span>}
                        </button>
                    );
                })}
            </div>

            <button className="btn" onClick={handleNext} style={{ marginTop: '0.5rem' }}>
                {currentIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question ➔'}
            </button>
        </div>
    );
}
