// src/components/StatsCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlane } from '@fortawesome/free-solid-svg-icons';

const StatsCard = ({ continents, countries, percentage }) => {
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
    </div>
  );
};

export default StatsCard;