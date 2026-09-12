// frontend/src/components/Timer.js
// Purpose: 45-second countdown timer per question using React useEffect & setInterval.
import React, { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 45, onTimeUp, questionIndex }) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);

    // VIVA: Reset timer to 45s whenever question index changes
    useEffect(() => {
        setTimeLeft(initialSeconds);
    }, [questionIndex, initialSeconds]);

    // VIVA: Tick every 1000ms until countdown reaches 0
    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // VIVA: Clean up timer interval on unmount
    }, [timeLeft, onTimeUp]);

    // VIVA: Calculate time remaining percentage for visual countdown progress bar
    const percentage = Math.max(0, Math.min(100, (timeLeft / initialSeconds) * 100));
    const isWarning = timeLeft <= 10;

    return (
        <div style={{ float: 'right', textAlign: 'right' }}>
            <div className="timer-badge" style={{ backgroundColor: isWarning ? '#ef4444' : '#f59e0b', color: '#ffffff', transition: '0.3s' }}>
                ⏱️ Time Left: {timeLeft}s
            </div>
            <div style={{ width: '130px', height: '6px', backgroundColor: '#d1fae5', borderRadius: '3px', marginTop: '6px', overflow: 'hidden', marginLeft: 'auto' }}>
                <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: isWarning ? '#ef4444' : '#10b981', transition: 'width 1s linear, background-color 0.3s' }} />
            </div>
        </div>
    );
}
