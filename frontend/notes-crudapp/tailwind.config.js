/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        RoyalBlue:"#676f9d",
        secondaryYellow:"#f9b17a",
        BasicBlue:"#424769"
      }
    },
  },
  plugins: [],
}

