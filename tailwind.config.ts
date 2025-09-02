import { type Config } from 'tailwindcss';

export default {
  content: ['{routes,islands,components}/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#15171c',
        'background-secondary': '#1a1b20',
        'text-primary': '#fafafa',
        'text-secondary': '#ece9e6',
        'text-tertiary': '#a4a7a9',
        primary: '#0f9d58',
      },
    },
  },
} satisfies Config;
