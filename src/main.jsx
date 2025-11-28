import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.jsx'
import './index.css'
import ErrorFallback from './components/ErrorFallback.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Opcional: Aquí puedes resetear el estado de la app si es necesario
        window.location.href = '/'; 
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)