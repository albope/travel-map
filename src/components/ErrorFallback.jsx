import React from 'react';
import { FaRedo, FaExclamationTriangle } from 'react-icons/fa';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-slate-100 animate-fade-in">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="text-4xl" />
        </div>
        
        <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">
          Ups, algo salió mal
        </h2>
        
        <p className="text-slate-500 mb-6 leading-relaxed">
          Lo sentimos, ha ocurrido un error inesperado. Hemos registrado el problema para solucionarlo.
        </p>

        {/* Mensaje técnico opcional (útil para desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
           <pre className="text-xs text-left bg-slate-900 text-red-300 p-4 rounded-xl mb-6 overflow-auto max-h-32">
             {error.message}
           </pre>
        )}

        <button
          onClick={resetErrorBoundary}
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-hover hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <FaRedo />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;