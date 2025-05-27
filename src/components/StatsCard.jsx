import React, { useState } from 'react';
import { FaGlobeEurope, FaFlag, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Estilos necesarios para la librería

const StatsCard = ({ continents, countries, percentage, visitedCountries }) => {
  const [showCountries, setShowCountries] = useState(false);

  const toggleCountriesVisibility = () => {
    setShowCountries(!showCountries);
  };

  const percentageValue = parseFloat(percentage) || 0;

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-center mb-6">My Travel Stats</h2>

      {/* --- Contenedor principal de estadísticas --- */}
      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* --- Gráfico Circular --- */}
        <div className="w-32 h-32 flex-shrink-0">
          <CircularProgressbar
            value={percentageValue}
            text={`${percentage}%`}
            styles={buildStyles({
              // Colores de la paleta de Tailwind
              pathColor: `rgba(255, 107, 107, ${percentageValue / 100})`, // accent color
              textColor: '#0A3641', // primary color
              trailColor: '#e2e8f0',
              backgroundColor: '#3e98c7',
            })}
          />
           <p className="text-center text-sm text-gray-500 mt-2">of the world</p>
        </div>

        {/* --- Estadísticas de Continentes y Países --- */}
        <div className="flex-grow grid grid-cols-2 gap-4 w-full">
            <div className="text-center">
                <FaGlobeEurope className="mx-auto text-3xl text-primary mb-2" />
                <p className="text-4xl font-bold font-display text-text-main">{continents}</p>
                <p className="text-sm text-gray-500">Continents</p>
            </div>
             <div className="text-center">
                <FaFlag className="mx-auto text-3xl text-primary mb-2" />
                <p className="text-4xl font-bold font-display text-text-main">{countries}</p>
                <p className="text-sm text-gray-500">Countries</p>
            </div>
        </div>
      </div>
      
      {/* --- Lista de Países Visitados (colapsable) --- */}
      <div className="mt-6">
        <button
          className="w-full text-left py-2 px-3 flex justify-between items-center rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleCountriesVisibility}
        >
          <span className="font-semibold text-text-main">
            {showCountries ? 'Hide' : 'Show'} Visited Countries ({visitedCountries.length})
          </span>
          {showCountries ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
        </button>

        {showCountries && (
          <div className="mt-2 p-3 bg-gray-50 rounded-md max-h-40 overflow-y-auto">
            {visitedCountries.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                {visitedCountries.sort().map((country) => (
                  <li key={country} className="text-sm text-gray-700 truncate">{country}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Select some countries to see them here.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;