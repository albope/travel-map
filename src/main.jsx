// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar 'react-dom/client' para React 18
import App from './App';  // Importa tu componente principal de la aplicación
import ErrorBoundary from './components/ErrorBoundary'; // Importa el límite de error

// Asegúrate de que el archivo CSS principal esté importado si existe
import './index.css';  // Opcional, dependiendo de tu configuración

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);