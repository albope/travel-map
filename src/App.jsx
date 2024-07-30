import React from 'react';
import './index.css';
import MapComponent from './components/MapComponent';
import CountrySelector from './components/CountrySelector';

const App = () => {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            🌍
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#pdf-generator">PDF Generator</a>
          </div>
        </nav>
      </header>
      <main className="main">
        <h1>Visited Countries Map</h1>
        <p>Here is an interactive visited countries map builder - a service that will show your friends how you've conquered the world. Have you traveled a lot and want to boast about your achievements? Maybe you are compiling a dream map of the destinations on your bucket list? Create a custom interactive map in a couple of clicks and share it with your community.</p>
        <div className="map-container">
          <MapComponent />
        </div>
        <div className="country-selector-container">
          <CountrySelector />
        </div>
      </main>
      <footer>
        <p>&copy; 2023 Your Website</p>
      </footer>
    </div>
  );
};

export default App;