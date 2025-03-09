/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily:{
      "heading": ['Blanka Regular','sans-serif'],
    },
    extend: {
      backgroundImage: {
        'home': "url('/src/images/home.jpg')",
      }
    }
  },
  plugins: [],
}

