/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raja: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          primary: '#FF5722',
          dark: '#E64A19',
          light: '#FF8A65'
        },
        charcoal: {
          800: '#26292B',
          900: '#1A1C1E',
          950: '#111214'
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF9EE',
          200: '#FFF3DD'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}
