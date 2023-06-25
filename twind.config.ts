import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: { 
        'sans': ['Saira', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'text': '#fff',	
        'background': '#1e2022',
        'gray-a': '#1b1a1f',
        'gray-b': '#4e4b57',
        'primary': '#34A269',
        'secondary': '#06a261',
      },
    },
  }
} as Options;
