import React, { useState } from 'react';
import { FaGlobeAmericas, FaFlag, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StatsCard = ({ continents, countries, percentage, visitedCountries }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentageValue = parseFloat(percentage) || 0;

  return (
    <div className="w-full">
      {/* Header Stats Grid */}
      <div className="flex items-center gap-6 mb-6">
        
        {/* Gráfico Circular Minimalista */}
        <div className="w-20 h-20 flex-shrink-0 relative">
          <CircularProgressbar
            value={percentageValue}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: '#0F766E', // Primary Teal
              textColor: 'transparent',
              trailColor: '#F1F5F9', // Slate 100
              strokeLinecap: 'round',
            })}
          />
          {/* Texto centralizado absoluto para mejor control */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-hover">
            <span className="text-sm font-bold leading-none">{percentageValue}%</span>
            <span className="text-[10px] text-slate-400 font-medium">WORLD</span>
          </div>
        </div>

        {/* Métricas Numéricas */}
        <div className="flex-grow grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FaFlag /> Países
            </div>
            <span className="text-2xl font-display font-bold text-slate-800">
              {countries}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FaGlobeAmericas /> Continentes
            </div>
            <span className="text-2xl font-display font-bold text-slate-800">
              {continents}
            </span>
          </div>
        </div>
      </div>

      {/* Lista Desplegable (Acordeón) */}
      <div className="border-t border-slate-100 pt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-2 text-sm text-slate-500 hover:text-primary transition-colors group"
        >
          <span className="font-medium group-hover:underline">
            Ver lista detallada
          </span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
          {visitedCountries.length > 0 ? (
            <div className="bg-slate-50 rounded-lg p-3 overflow-y-auto max-h-60 custom-scrollbar">
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                {[...visitedCountries].sort().map((country) => (
                  <li key={country} className="text-xs text-slate-600 truncate flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic text-center py-2">
              Aún no has seleccionado ningún país.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;