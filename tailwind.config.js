/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",         // for expo-router screens
    "./components/**/*.{js,ts,jsx,tsx}",  // for reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
