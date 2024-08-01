import React, { useState } from "react";
import "./index.css";
import MapComponent from "./components/MapComponent";
import CountrySelector from "./components/CountrySelector";

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleCountrySelect = (countries) => {
    setSelectedCountries(countries);
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <span role="img" aria-label="globe">
              🌍
            </span>
            <span>Travel-Map Generator</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#pdf-generator">PDF Generator</a>
          </div>
        </nav>
      </header>
      <main className="main">
        <h1 className="main-title">Travel. Select. Generate.</h1>
        <p className="main-description">
          Create a personalized travel map showcasing the countries you've
          visited. Share your adventures with friends and plan your next
          destination!
        </p>
        <div className="map-container">
          <MapComponent selectedCountries={selectedCountries} />
        </div>
        <div className="country-selector-container">
          <CountrySelector onCountrySelect={handleCountrySelect} />
        </div>
      </main>
      <footer>
        <p>
          Made with <span style={{ color: "red" }}>❤</span> by Alberto Bort
        </p>
      </footer>
    </div>
  );
};

export default App;