/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#F5F6FA',
        purpleBlue: '#91218f',
        purpleShadow: 'rgba(99,132,250,0.55)'
      }
    },
  },
  plugins: [],
}