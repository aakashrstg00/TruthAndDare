/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        group: {
          blue: '#00d2ff',
          pink: '#ff007f',
        },
        couple: {
          crimson: '#dc143c',
          red: '#8b0000',
          gold: '#ffd700',
        },
        dark: {
          bg: '#000000',
          gradientStart: '#0f0c29',
          gradientMid: '#302b63',
          gradientEnd: '#24243e'
        }
      }
    },
  },
  plugins: [],
}
