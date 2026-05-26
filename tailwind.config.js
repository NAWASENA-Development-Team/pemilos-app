// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Fredoka', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1e1b4b', // Indigo 950 - Deep rich background
          primary: '#7c3aed', // Violet 600 - Main playful primary
          accent: '#fde047', // Yellow 300 - Super bright yellow accent
          pink: '#f472b6', // Pink 400 - Playful highlight
          cyan: '#22d3ee', // Cyan 400 - Playful secondary
          light: '#fdf4ff', // Fuchsia 50 - Cheerful off-white background
          card: '#ffffff',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'glow-pink': '0 0 20px rgba(244, 114, 182, 0.6)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.6)',
      }
    },
  },
  plugins: [],
}