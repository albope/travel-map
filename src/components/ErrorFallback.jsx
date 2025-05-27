import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-background text-text-main p-8"
      role="alert"
    >
      <div className="text-center bg-white p-10 rounded-lg shadow-2xl max-w-lg">
        <FaExclamationTriangle className="mx-auto text-5xl text-red-500 mb-6" />
        <h1 className="font-display text-3xl font-bold text-primary mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Our team has been notified, but you can try refreshing the application.
        </p>
        {/* Este pre-formateado es útil para ver el error en desarrollo */}
        <pre className="text-left bg-gray-100 text-red-700 text-xs p-4 rounded-md overflow-auto mb-8">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;