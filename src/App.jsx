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
        <div className="title-container">
          <h1 className="main-title">Travel. Select. Generate.</h1>
          <p className="main-description">Create a personalized travel map showcasing the countries you've visited. Share your adventures with friends and plan your next destination!</p>
        </div>
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