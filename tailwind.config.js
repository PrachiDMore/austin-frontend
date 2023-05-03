/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#F5F6FA',
        darkPurple: '#91218f',
        lightPurple: '#ab2ea9',
        purpleShadow: 'rgba(145, 33, 143,0.55)'
      }
    },
  },
  plugins: [],
}