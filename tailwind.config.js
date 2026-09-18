/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50:  '#FDFBF7',
          100: '#FDF8F0',
          200: '#F9F1E3',
          300: '#F5EDE0',
          400: '#EDE0CC',
          500: '#E0CEAF',
        },
        champagne: {
          DEFAULT: '#F5EDE0',
          dark:    '#E8D9C5',
          darker:  '#D4C4A8',
        },
        antique: {
          gold:   '#C4A265',
          dark:   '#A0824A',
          light:  '#D4B87A',
          pale:   '#E8D5A8',
        },
        warm: {
          charcoal: '#2C2421',
          taupe:    '#8B7D6B',
          sienna:   '#6E4B3A',
          brown:    '#4A3728',
        },
        blush: {
          DEFAULT: '#D4A5A5',
          light:   '#E8C8C8',
          dark:    '#B8898A',
        },
        sage: {
          DEFAULT: '#9CAF88',
          light:   '#B8C9A8',
          dark:    '#7A9268',
        },
        burgundy: {
          DEFAULT: '#6B2737',
          dark:    '#4D1B27',
          light:   '#8B3A4D',
        },
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        body:   ['"Lora"', 'Georgia', 'serif'],
        ui:     ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm':   '0 8px 40px rgba(44, 36, 33, 0.12)',
        'card':   '0 2px 20px rgba(44, 36, 33, 0.08)',
        'frame':  '0 12px 50px rgba(100, 60, 40, 0.20)',
        'inset':  'inset 0 2px 8px rgba(44, 36, 33, 0.10)',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'fade-in':    'fadeIn 1s ease-out forwards',
        'drift':      'drift 12s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(3deg)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%':   { transform: 'translateY(-5%) translateX(0) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(105vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}


