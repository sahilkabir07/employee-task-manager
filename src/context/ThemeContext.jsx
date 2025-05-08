import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Get the initial theme from localStorage, or default to 'light'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('app-theme') || 'light';
    });

    // Update localStorage and body class when theme changes
    useEffect(() => {
        // Store the theme in localStorage
        localStorage.setItem('app-theme', theme);

        // Add or remove the 'dark' class to the body based on the selected theme
        if (theme === 'dark') {
            document.body.classList.add('dark'); // Tailwind uses this class for dark mode
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);
