import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        'text': '#ffffff',
        'background': '#010405',
        'primary-button': '#a0baf3',
        'secondary-button': '#060317',
        'accent': '#6345e8',
      },
    },
  }
} as Options;
