/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ripple: theme => ({
        colors: theme('colors')
      }),
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'wave': 'wave 2s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
} 