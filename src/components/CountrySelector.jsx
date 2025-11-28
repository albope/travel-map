import React, { useState, useMemo } from "react";
import { FaSearch, FaTimes, FaCheck, FaGlobeAmericas } from 'react-icons/fa';
import countriesData from "../data/world-110m.json";
import { continentMapping } from "../data/continentMapping";

// Extraemos la lista una sola vez
const allCountries = countriesData.features
  .map(feature => feature.properties.ADMIN)
  .filter(name => continentMapping[name])
  .sort();

const CountrySelector = ({ onCountrySelect, selectedCountries }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return allCountries;
    return allCountries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleCountry = (country) => {
    const isSelected = selectedCountries.includes(country);
    const newSelection = isSelected
      ? selectedCountries.filter(c => c !== country)
      : [...selectedCountries, country];
    
    onCountrySelect(newSelection);
    if (!isSelected) setSearchTerm(""); // Limpiar al seleccionar para seguir explorando
  };

  const clearSelection = () => onCountrySelect([]);

  // Separamos seleccionados para mostrar arriba
  const sortedSelected = useMemo(() => 
    [...selectedCountries].sort(), 
  [selectedCountries]);

  return (
    <div className="flex flex-col h-full w-full">
      
      {/* --- Search Input Moderno --- */}
      <div className="relative group mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 sm:text-sm"
        />
      </div>

      {/* --- Chips de Países Seleccionados --- */}
      {sortedSelected.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Seleccionados ({sortedSelected.length})
            </span>
            <button 
              onClick={clearSelection}
              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Borrar todo
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
            {sortedSelected.map(country => (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                className="group flex items-center gap-1.5 bg-primary/10 text-primary-hover px-3 py-1 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
              >
                <span>{country}</span>
                <FaTimes className="text-xs opacity-50 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- Lista de Resultados --- */}
      <div className="flex-grow overflow-hidden border border-slate-100 rounded-xl bg-white shadow-inner flex flex-col">
        {filteredCountries.length > 0 ? (
          <ul className="overflow-y-auto p-1 custom-scrollbar flex-grow max-h-[300px]">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountries.includes(country);
              return (
                <li key={country}>
                  <button
                    onClick={() => toggleCountry(country)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 flex items-center justify-between transition-all duration-150 ${
                      isSelected
                        ? 'bg-primary text-white shadow-md transform scale-[0.99]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium truncate">{country}</span>
                    {isSelected && <FaCheck className="text-white text-xs" />}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <FaGlobeAmericas className="text-3xl mb-2 opacity-20" />
            <p className="text-sm">No encontramos ese país</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;