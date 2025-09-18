/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  darkMode: false, // Desactiva el modo oscuro de Tailwind
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Solo habilita el tema claro
  },
};