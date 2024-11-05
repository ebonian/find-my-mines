'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const black = {
    backgroundDark: '#191B27', // Matches yakult's keys
    backgroundLight: 'black',
    revealedBackground: '#0D1321',
    revealedBorder: 'rgba(255, 237, 223, 0.65)',
    colors: {
        white: '#FFEEDF', // Slightly off-white
        brown: '#86655C', // Brown
        grey: '#252525', // Dark gray
        black: '#0D1321', // Dark gray/blue (same as revealed background)
        cyan: '#AFE0CE', // Cyan
        green: '#C6D48D', // Green
        orange: '#EE964B', // Orange
        purple: '#C59CC8', // Purple
        red: '#C33A21', // Red
        flagRed: '#C33A21', // Red (for flag)
    },
};

const yakult = {
    backgroundDark: '#EDAB73',
    backgroundLight: '#FFEEDF',
    revealedBackground: '#F2E2D5',
    revealedBorder: 'rgba(150, 116, 88, 0.65)',
    colors: {
        white: '#FFEEDF', // Off-white
        lightBeige: '#F2E2D5', // Very light beige
        lightBrown: '#EDAB73', // Light brown
        darkRed: '#BC1C31', // Dark red
        brown: '#86655C', // Brown
        orangeRed: '#C83432', // Orange-red
        flagRed: '#BC1C31', // Dark red (for flag) — Matches darkRed.
    },
};

const getThemeFromLocalStorage = () => {
    const storedTheme = localStorage.getItem('selectedTheme');
    return storedTheme ? (storedTheme === 'yakult' ? yakult : black) : black; // Improved: Default to black
};

const setThemeInLocalStorage = (theme: typeof black | typeof yakult) => {
    localStorage.setItem(
        'selectedTheme',
        theme === yakult ? 'yakult' : 'black'
    );
};

const ThemeContext = createContext<{
    selectedTheme: typeof black | typeof yakult;
    setSelectedTheme: React.Dispatch<
        React.SetStateAction<typeof black | typeof yakult>
    >;
}>({ selectedTheme: black, setSelectedTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTheme, setSelectedTheme] = useState<
        typeof black | typeof yakult
    >(getThemeFromLocalStorage());

    useEffect(() => {
        setThemeInLocalStorage(selectedTheme);
    }, [selectedTheme]);

    return (
        <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { black, yakult };

export const useTheme = () => useContext(ThemeContext);
