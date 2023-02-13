/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/store/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '5rem',
        xl: '7rem',
        '2xl': '10rem',
      },
    },
    extend: {
      colors: {
        primary: {
          light: '#A29AE8',
          DEFAULT: '#8479E1',
          dark: '#5E4FD8',
          accent: '#FFFFFF',
        },
        success: {
          light: '#17f8be',
          DEFAULT: '#06D6A0',
          dark: '#05a87d',
          accent: '#FFFFFF',
        },
        warning: {
          light: '#FFE19B',
          DEFAULT: '#FFD166',
          dark: '#FFC233',
          accent: '#091069',
        },
        danger: {
          light: '#F26D8D',
          DEFAULT: '#EF476F',
          dark: '#EB184A',
          accent: '#FFFFFF',
        },
        dark: '#091069',
        light: '#FFFFFF',
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      transitionDelay: {
        0: '0ms',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hoverable', '@media(any-hover:hover)');
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
};
