/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  darkMode: "class",
};
