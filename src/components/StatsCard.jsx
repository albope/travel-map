// src/components/StatsCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlane } from '@fortawesome/free-solid-svg-icons';

const StatsCard = ({ continents, countries, percentage, visitedCountries }) => {
  return (
    <div className="stats-container">
      {/* Continents */}
      <div className="stat-item">
        <FontAwesomeIcon icon={faGlobe} className="icon text-blue-500 mb-1" />
        <div>
          <span className="text-lg font-semibold">Continents:</span>
          <span className="text-lg ml-1">{continents}</span>
        </div>
      </div>
      {/* Countries */}
      <div className="stat-item">
        <FontAwesomeIcon icon={faPlane} className="icon text-green-500 mb-1" />
        <div>
          <span className="text-lg font-semibold">Countries:</span>
          <span className="text-lg ml-1">{countries}</span>
        </div>
      </div>
      {/* Visited */}
      <div className="stat-item">
        <FontAwesomeIcon icon={faGlobe} className="icon text-purple-500 mb-1" />
        <div>
          <span className="text-lg font-semibold">Visited:</span>
          <span className="text-lg ml-1">{percentage}%</span>
        </div>
      </div>
      {/* Visited Countries List */}
      <div className="visited-countries-list">
        <h3 className="font-semibold mt-4">Visited Countries:</h3>
        <ul>
          {visitedCountries.map((country, index) => (
            <li key={index} className="text-sm">{country}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsCard;