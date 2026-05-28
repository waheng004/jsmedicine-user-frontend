/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf6f1',
          100: '#f0ebe5',
          200: '#e6d9c8',
          300: '#d4a574',
          400: '#c9925a',
          500: '#c19660',
          600: '#b38655',
          700: '#8b7355',
          800: '#6d5c45',
          900: '#544a38'
        }
      }
    }
  },
  plugins: []
}