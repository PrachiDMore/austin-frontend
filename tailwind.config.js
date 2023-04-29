/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#F5F6FA',
        purpleBlue: '#6383FA'
      }
    },
  },
  plugins: [],
}