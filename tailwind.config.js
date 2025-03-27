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
    },
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
} 