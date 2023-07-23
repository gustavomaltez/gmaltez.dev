import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: { 
        'sans': ['Saira', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'background': '#191c23',
        'background-secondary': '#1e2028',
        'text-primary': '#c9d4dc',
        'text-secondary': '#a6b0c3',
        'text-tertiary': '#636876',
        'primary': '#0f9d58',
      },
    },
  }
} as Options;
