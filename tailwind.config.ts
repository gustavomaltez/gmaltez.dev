import { type Config } from 'tailwindcss';

export default {
  content: ['{routes,islands,components}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#1c212d',
        'background-secondary': '#262c39',
        'text-primary': '#d0d4de',
        'text-secondary': '#959aa6',
        'text-tertiary': '#5f6677',
        primary: '#0f9d58',
      },
    },
  },
} satisfies Config;
