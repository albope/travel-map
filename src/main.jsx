import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary'; // <-- Importar desde la nueva librería
import App from './App';
import ErrorFallback from './components/ErrorFallback'; // <-- Importar nuestro nuevo componente de UI
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Esta función se ejecuta cuando el usuario pulsa "Try Again"
        window.location.reload();
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);