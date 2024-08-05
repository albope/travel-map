import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Asegúrate de que no hay alias que puedan interferir
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@fortawesome/fontawesome-free/css/all.min.css";`,
      },
    },
  },
  server: {
    open: true, // Abre automáticamente en el navegador
  },
});