/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        premium: {
          bg: '#0B0B0C',
          dark: '#161616',
          card: '#222222',
          white: '#F5F5F5',
          gold: '#C8A45C',
          led: '#FFE6B8',
          blue: '#5B8DFF',
          green: '#55D68A',
          red: '#FF5A63',
        },
        glass: {
          DEFAULT: 'rgba(22, 22, 22, 0.6)',
          border: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.04)',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
