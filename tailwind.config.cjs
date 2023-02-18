/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          default: "24px",
        },
      },
    },
  },
  plugins: [],
};
