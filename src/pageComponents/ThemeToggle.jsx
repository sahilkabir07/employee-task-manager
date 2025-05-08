import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md border shadow-md transition duration-300 flex items-center gap-2"
        >
            {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            <span className="hidden md:block">
                {theme === 'light' ? 'Dark' : 'Light'}
            </span>
        </button>
    );
};

export default ThemeToggle;
