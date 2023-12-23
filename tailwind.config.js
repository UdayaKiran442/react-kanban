/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryBlack: "#808080",
        secondaryWhite: "#F4F5F8",
      },
    },
  },
  plugins: [],
};
