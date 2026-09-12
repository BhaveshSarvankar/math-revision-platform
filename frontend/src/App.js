// frontend/src/App.js
// Purpose: Main React application component managing page routing, student auth state, and theme provider.
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FormulaPage from './pages/FormulaPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import { ThemeProvider, useTheme } from './ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

function AppContent() {
    const [activePage, setActivePage] = useState('login');
    const [user, setUser] = useState(null);
    const { theme } = useTheme();

    // VIVA: Check for stored user session in localStorage on initial component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            // VIVA: Show Progress Dashboard by default when logged in (prevents auto-triggering Gemini API)
            setActivePage('dashboard');
        } else {
            setActivePage('login');
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        // VIVA: Redirect to Progress Dashboard page on login instead of Formula Revision
        setActivePage('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setActivePage('login');
    };

    return (
        <div data-theme={theme} style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)', minHeight: '100vh', transition: '0.25s' }}>
            <Navbar activePage={activePage} setActivePage={setActivePage} user={user} onLogout={handleLogout} />
            {activePage === 'login' && (
                <LoginPage onLoginSuccess={handleLoginSuccess} switchToRegister={() => setActivePage('register')} />
            )}
            {activePage === 'register' && (
                <RegisterPage switchToLogin={() => setActivePage('login')} />
            )}
            {activePage === 'formulas' && <FormulaPage />}
            {activePage === 'quiz' && <QuizPage />}
            {activePage === 'dashboard' && <DashboardPage />}
        </div>
    );
}
