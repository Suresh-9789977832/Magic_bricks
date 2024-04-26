/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: "rgb(51,65,85)",
        basered:"rgb(187,28,28)",
      },
      height: {
        600: "600px",
        300:"300px"
      },
      screens: {
        "3md": "769px",
        "3lg": "1025px",
        "3sm": "426px",
        "3ssm": "376px",
        "3sssm":"321px"
      }
    },
  },
  plugins: [],
}