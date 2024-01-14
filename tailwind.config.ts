import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      height: {
        header: 'var(--header-height)',
      },
      zIndex: {
        header: 'calc(var(--header-zindex) + 1)',
      },
      backgroundColor: {
        header: '##fff',
        // header: '#0a0a0a',
      },
      maxWidth: {
        'custom-vw': '100vw',
      },
      scrollPadding: {
        top: 'var(--header-height)',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
};
export default config;
