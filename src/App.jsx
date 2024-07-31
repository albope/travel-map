import React from 'react';
import './index.css';
import MapComponent from './components/MapComponent';
import CountrySelector from './components/CountrySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa el CSS de Font Awesome

const App = () => {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faGlobe} style={{ color: 'white', marginRight: '10px', fontSize: '24px' }} />
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>travel-map generator</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#pdf-generator">PDF Generator</a>
          </div>
        </nav>
      </header>
      <main className="main">
        <div>
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
        <p>Made with <span style={{ color: 'red' }}>❤</span> by Alberto Bort</p>
      </footer>
    </div>
  );
};

export default App;