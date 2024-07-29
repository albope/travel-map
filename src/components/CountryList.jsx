// src/components/CountryList.jsx
import React from 'react';

const countries = ['France', 'Spain', 'Germany', 'Italy'];

const CountryList = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Visited Countries</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index} className="py-2 border-b last:border-none">
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;