// src/components/CountrySelector.jsx
import React from 'react';

const CountrySelector = () => {
  return (
    <div className="country-selector">
      <h2>Select countries you visited</h2>
      <ul>
        <li>
          <input type="checkbox" id="country1" name="country1" />
          <label htmlFor="country1">Country 1</label>
        </li>
        <li>
          <input type="checkbox" id="country2" name="country2" />
          <label htmlFor="country2">Country 2</label>
        </li>
        {/* Agrega más países según sea necesario */}
      </ul>
    </div>
  );
};

export default CountrySelector;