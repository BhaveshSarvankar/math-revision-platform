// frontend/src/components/Navbar.js
// Purpose: Top navigation bar displaying navigation links, theme toggle control, and student login status.
import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Navbar({ activePage, setActivePage, user, onLogout }) {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="nav-brand">MAH-MBA-CET Math Practice</div>

            <div className="nav-controls">
                {/* VIVA: 3-Theme Selector control for Light, Dark, and Night modes */}
                <div className="theme-toggle-group">
                    <button
                        style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.8rem',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: theme === 'light' ? 'var(--accent)' : 'transparent',
                            color: theme === 'light' ? '#ffffff' : 'var(--text-muted)',
                            fontWeight: theme === 'light' ? 'bold' : '500',
                            transition: '0.2s'
                        }}
                        onClick={() => setTheme('light')}
                        title="Light Theme"
                    >
                        ☀️ Light
                    </button>
                    <button
                        style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.8rem',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: theme === 'dark' ? 'var(--accent)' : 'transparent',
                            color: theme === 'dark' ? '#ffffff' : 'var(--text-muted)',
                            fontWeight: theme === 'dark' ? 'bold' : '500',
                            transition: '0.2s'
                        }}
                        onClick={() => setTheme('dark')}
                        title="Dark Theme"
                    >
                        🌙 Dark
                    </button>
                    <button
                        style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.8rem',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: theme === 'night' ? 'var(--accent)' : 'transparent',
                            color: theme === 'night' ? '#ffffff' : 'var(--text-muted)',
                            fontWeight: theme === 'night' ? 'bold' : '500',
                            transition: '0.2s'
                        }}
                        onClick={() => setTheme('night')}
                        title="Night Theme (Warm Amber)"
                    >
                        🦉 Night
                    </button>
                </div>

                {user ? (
                    <div className="nav-links">
                        <button
                            className={activePage === 'formulas' ? 'active' : ''}
                            onClick={() => setActivePage('formulas')}
                        >
                            Formula Revision
                        </button>
                        <button
                            className={activePage === 'quiz' ? 'active' : ''}
                            onClick={() => setActivePage('quiz')}
                        >
                            Timed Quiz
                        </button>
                        <button
                            className={activePage === 'dashboard' ? 'active' : ''}
                            onClick={() => setActivePage('dashboard')}
                        >
                            Progress Dashboard
                        </button>
                        <button className="btn-logout" onClick={onLogout}>
                            Logout ({user.name})
                        </button>
                    </div>
                ) : (
                    <div className="nav-links">
                        <button
                            className={activePage === 'login' ? 'active' : ''}
                            onClick={() => setActivePage('login')}
                        >
                            Login
                        </button>
                        <button
                            className={activePage === 'register' ? 'active' : ''}
                            onClick={() => setActivePage('register')}
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
