import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check local storage for saved theme preference
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // Default to light mode
    });

    const toggleDarkMode = () => {
        setDarkMode((prevMode: any) => !prevMode);
    };

    useEffect(() => {
        // Save the theme preference in local storage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return [darkMode, toggleDarkMode];
};

export default useDarkMode;