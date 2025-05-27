/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8F9FA',
        'text-main': '#212529',
        'primary': '#0A3641', // Verde azulado oscuro
        'primary-hover': '#062229',
        'accent': '#FF6B6B', // Coral para destacar
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Fuente para el cuerpo de texto
        display: ['Poppins', 'sans-serif'], // Fuente para títulos
      },
    },
  },
  plugins: [],
}