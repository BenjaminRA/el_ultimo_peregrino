/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#faf7f0',
          100: '#f5ede0',
          200: '#e8dac3',
          300: '#d9c29d',
          400: '#c8a676',
          500: '#b8904f',
          600: '#9a7542',
          700: '#7d5d37',
          800: '#674c30',
          900: '#56402a',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        'medieval': ['Cinzel', 'serif'],
        'script': ['Grenze Gotisch', 'serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.05\" /%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
