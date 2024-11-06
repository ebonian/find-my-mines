import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                white: '#FFEDDF',
                brown: '#86615C',
                gray: '#252525',
                black: '#0D1321',
                cyan: '#AFE0CE',
                green: '#C5D86D',
                orange: '#EE964B',
                purple: '#C59CC8',
                red: '#C33432',
            },
            keyframes: {
                spinSlot: {
                    '0%': { transform: 'translateY(-300%) scale(1)', opacity: "0" },
                    '50%': { transform: 'translateY(0) scale(1.5)', opacity: "1" },
                    '100%': { transform: 'translateY(300%) scale(1)', opacity: "0" },
                },
              },
              animation: {
                spinSlot: 'spinSlot 0.2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};

export default config;
