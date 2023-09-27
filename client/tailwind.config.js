/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        black: '#000',
        white: '#FFF',
        violet: '#C9C4EC',
        purple: '#150D1E',
        'dark-violet': '#C1A1E9'
      },
      fontFamily: {
        primary: ['"Kite One"', 'sans-serif'],
        secondary: ['"Jost Variable"', 'sans-serif']
      },
      animation: {
        'slide-xxfast': 'slide 21s linear infinite reverse',
        'slide-xfast': 'slide 24s linear infinite',
        'slide-fast': 'slide 27s linear infinite reverse',
        slide: 'slide 39s linear infinite',
        'slide-slow': 'slide 51s linear infinite reverse',
        'slide-xslow': 'slide 54s linear infinite',
        'slide-xxslow': 'slide 57s linear infinite',
        fadein: 'fadein .3s ease-in-out',
        fadeout: 'fadeout .3s ease-in-out'
      },
      keyframes: {
        slide: {
          from: { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { opacity: 1 },
          to: { transform: 'translateX(100%)', opacity: 0 }
        },
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        fadeout: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        }
      }
    }
  },
  plugins: []
};
