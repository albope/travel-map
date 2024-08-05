// src/components/StatsCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlane } from '@fortawesome/free-solid-svg-icons';

const StatsCard = ({ continents, countries, percentage }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="p-4 flex justify-between items-center">
        {/* Continents */}
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faGlobe} className="text-blue-500 mb-1" />
          <div>
            <span className="text-lg font-semibold">Continents:</span>
            <span className="text-lg ml-1">{continents}</span>
          </div>
        </div>
        {/* Countries */}
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faPlane} className="text-green-500 mb-1" />
          <div>
            <span className="text-lg font-semibold">Countries:</span>
            <span className="text-lg ml-1">{countries}</span>
          </div>
        </div>
        {/* Visited */}
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faGlobe} className="text-purple-500 mb-1" />
          <div>
            <span className="text-lg font-semibold">Visited:</span>
            <span className="text-lg ml-1">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;