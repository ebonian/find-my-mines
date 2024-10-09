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
        },
    },
    plugins: [],
};

export default config;
