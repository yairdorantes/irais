/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        penScript: ["Chilanka", " cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
