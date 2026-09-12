// frontend/src/ThemeContext.js
// Purpose: React Context providing theme state ('light', 'dark', 'night') and toggle handlers.
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // VIVA: Session-level React state for 3 themes: 'light', 'dark', 'night'
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
