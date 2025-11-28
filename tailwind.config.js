/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Más limpio que Lato para UI moderna
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Fondo principal (ligeramente gris para reducir fatiga visual)
        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',
        
        // Textos
        'text-main': '#0F172A', // Slate 900
        'text-secondary': '#64748B', // Slate 500
        
        // Color Primario (Un Teal más moderno y profundo)
        primary: {
          DEFAULT: '#0F766E', // Teal 700
          hover: '#0D9488',   // Teal 600
          light: '#CCFBF1',   // Teal 100 (para fondos suaves)
        },
        
        // Acentos
        accent: '#F43F5E', // Rose 500 (más vibrante que el coral anterior)
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'float': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}