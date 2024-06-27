/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/*.{js,ts,jsx.tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "cta": "",
        "dark-primary":"#1C1C1D",
        "dark-secondary":"#262626",
        "primary": "#fff",
        "secondary":"#a1a1aa",
        "dark-cta": "#1F57E7"
      },
      fontFamily: {
        "primary": "Inter"
      }
    },
  },
  plugins: [],
}

