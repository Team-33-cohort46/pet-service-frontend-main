/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#02bad2',
        },
      fontFamily: {
        "montserrat": "'Montserrat', serif"
      },
    },
  },
  plugins: [],
}

