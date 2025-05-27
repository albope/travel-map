import React, { useState, useMemo } from "react";
import { FaSearch, FaTimesCircle, FaTimes } from 'react-icons/fa'; // Añadimos FaTimes para el icono 'x'
import countriesData from "../data/world-110m.json";
import { continentMapping } from "../data/continentMapping";

const allCountries = countriesData.features
  .map(feature => feature.properties.ADMIN)
  .filter(name => continentMapping[name])
  .sort();

const CountrySelector = ({ onCountrySelect, selectedCountries }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return allCountries;
    }
    return allCountries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCountryToggle = (country) => {
    const isSelected = selectedCountries.includes(country);
    if (isSelected) {
      onCountrySelect(selectedCountries.filter(c => c !== country));
    } else {
      onCountrySelect([...selectedCountries, country]);
    }
    // Mejora de UX: Limpiamos la búsqueda después de seleccionar/deseleccionar un país
    // para que el usuario vea la lista completa de nuevo.
    setSearchTerm("");
  };

  const handleUnmarkAll = () => {
    onCountrySelect([]);
  };

  // Ordenamos los países seleccionados alfabéticamente para una visualización consistente
  const sortedSelectedCountries = useMemo(() => 
    [...selectedCountries].sort(), 
  [selectedCountries]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-bold text-center mb-4">Select Countries</h2>
      
      {/* --- Campo de Búsqueda --- */}
      <div className="relative mb-4">
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
        />
      </div>

      {/* --- NUEVA SECCIÓN: Países Seleccionados --- */}
      {sortedSelectedCountries.length > 0 && (
        <div className="mb-4 p-2 border rounded-lg bg-gray-50 max-h-32 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
                {sortedSelectedCountries.map(country => (
                    <div 
                        key={country} 
                        className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-2 py-1 rounded-full animate-fade-in"
                    >
                        <span>{country}</span>
                        <button 
                            onClick={() => handleCountryToggle(country)} 
                            className="text-white hover:text-accent transition-colors"
                            aria-label={`Remove ${country}`}
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- Lista de Países para Seleccionar --- */}
      <div className="flex-grow border rounded-lg p-2 bg-gray-50 max-h-60 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 gap-1">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountries.includes(country);
              return (
                <button
                  key={country}
                  onClick={() => handleCountryToggle(country)}
                  className={`w-full text-left p-2 rounded-md text-sm transition-colors duration-150 ${
                    isSelected
                      ? 'bg-accent text-white font-semibold'
                      : 'text-text-main hover:bg-gray-200'
                  }`}
                >
                  {country}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No countries found.</p>
        )}
      </div>

      {/* --- Botón para desmarcar todos --- */}
      {selectedCountries.length > 0 && (
          <button
            onClick={handleUnmarkAll}
            className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
          >
            <FaTimesCircle />
            Unmark All ({selectedCountries.length})
          </button>
      )}
    </div>
  );
};

export default CountrySelector;