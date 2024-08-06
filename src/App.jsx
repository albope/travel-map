// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import CountrySelector from "./components/CountrySelector";
import StatsCard from "./components/StatsCard";
import About from "./components/About";
import HamburgerMenu from "./components/HamburgerMenu";
import "./index.css";

// Mapeo manual de países a continentes
const continentMapping = {
  "Afghanistan": "Asia",
  "Albania": "Europe",
  "Algeria": "Africa",
  "Andorra": "Europe",
  "Angola": "Africa",
  "Antigua and Barbuda": "North America",
  "Argentina": "South America",
  "Armenia": "Asia",
  "Australia": "Oceania",
  "Austria": "Europe",
  "Azerbaijan": "Asia",
  "Bahamas": "North America",
  "Bahrain": "Asia",
  "Bangladesh": "Asia",
  "Barbados": "North America",
  "Belarus": "Europe",
  "Belgium": "Europe",
  "Belize": "North America",
  "Benin": "Africa",
  "Bhutan": "Asia",
  "Bolivia": "South America",
  "Bosnia and Herzegovina": "Europe",
  "Botswana": "Africa",
  "Brazil": "South America",
  "Brunei": "Asia",
  "Bulgaria": "Europe",
  "Burkina Faso": "Africa",
  "Burundi": "Africa",
  "Cabo Verde": "Africa",
  "Cambodia": "Asia",
  "Cameroon": "Africa",
  "Canada": "North America",
  "Central African Republic": "Africa",
  "Chad": "Africa",
  "Chile": "South America",
  "China": "Asia",
  "Colombia": "South America",
  "Comoros": "Africa",
  "Congo (Congo-Brazzaville)": "Africa",
  "Costa Rica": "North America",
  "Croatia": "Europe",
  "Cuba": "North America",
  "Cyprus": "Europe",
  "Czechia": "Europe",
  "Democratic Republic of the Congo": "Africa",
  "Denmark": "Europe",
  "Djibouti": "Africa",
  "Dominica": "North America",
  "Dominican Republic": "North America",
  "Ecuador": "South America",
  "Egypt": "Africa",
  "El Salvador": "North America",
  "Equatorial Guinea": "Africa",
  "Eritrea": "Africa",
  "Estonia": "Europe",
  "Eswatini": "Africa",
  "Ethiopia": "Africa",
  "Fiji": "Oceania",
  "Finland": "Europe",
  "France": "Europe",
  "Gabon": "Africa",
  "Gambia": "Africa",
  "Georgia": "Asia",
  "Germany": "Europe",
  "Ghana": "Africa",
  "Greece": "Europe",
  "Grenada": "North America",
  "Guatemala": "North America",
  "Guinea": "Africa",
  "Guinea-Bissau": "Africa",
  "Guyana": "South America",
  "Haiti": "North America",
  "Holy See": "Europe",
  "Honduras": "North America",
  "Hungary": "Europe",
  "Iceland": "Europe",
  "India": "Asia",
  "Indonesia": "Asia",
  "Iran": "Asia",
  "Iraq": "Asia",
  "Ireland": "Europe",
  "Israel": "Asia",
  "Italy": "Europe",
  "Jamaica": "North America",
  "Japan": "Asia",
  "Jordan": "Asia",
  "Kazakhstan": "Asia",
  "Kenya": "Africa",
  "Kiribati": "Oceania",
  "Kuwait": "Asia",
  "Kyrgyzstan": "Asia",
  "Laos": "Asia",
  "Latvia": "Europe",
  "Lebanon": "Asia",
  "Lesotho": "Africa",
  "Liberia": "Africa",
  "Libya": "Africa",
  "Liechtenstein": "Europe",
  "Lithuania": "Europe",
  "Luxembourg": "Europe",
  "Madagascar": "Africa",
  "Malawi": "Africa",
  "Malaysia": "Asia",
  "Maldives": "Asia",
  "Mali": "Africa",
  "Malta": "Europe",
  "Marshall Islands": "Oceania",
  "Mauritania": "Africa",
  "Mauritius": "Africa",
  "Mexico": "North America",
  "Micronesia": "Oceania",
  "Moldova": "Europe",
  "Monaco": "Europe",
  "Mongolia": "Asia",
  "Montenegro": "Europe",
  "Morocco": "Africa",
  "Mozambique": "Africa",
  "Myanmar": "Asia",
  "Namibia": "Africa",
  "Nauru": "Oceania",
  "Nepal": "Asia",
  "Netherlands": "Europe",
  "New Zealand": "Oceania",
  "Nicaragua": "North America",
  "Niger": "Africa",
  "Nigeria": "Africa",
  "North Korea": "Asia",
  "North Macedonia": "Europe",
  "Norway": "Europe",
  "Oman": "Asia",
  "Pakistan": "Asia",
  "Palau": "Oceania",
  "Palestine": "Asia",
  "Panama": "North America",
  "Papua New Guinea": "Oceania",
  "Paraguay": "South America",
  "Peru": "South America",
  "Philippines": "Asia",
  "Poland": "Europe",
  "Portugal": "Europe",
  "Qatar": "Asia",
  "Romania": "Europe",
  "Russia": "Europe", // Parte en Asia
  "Rwanda": "Africa",
  "Saint Kitts and Nevis": "North America",
  "Saint Lucia": "North America",
  "Saint Vincent and the Grenadines": "North America",
  "Samoa": "Oceania",
  "San Marino": "Europe",
  "Sao Tome and Principe": "Africa",
  "Saudi Arabia": "Asia",
  "Senegal": "Africa",
  "Serbia": "Europe",
  "Seychelles": "Africa",
  "Sierra Leone": "Africa",
  "Singapore": "Asia",
  "Slovakia": "Europe",
  "Slovenia": "Europe",
  "Solomon Islands": "Oceania",
  "Somalia": "Africa",
  "South Africa": "Africa",
  "South Korea": "Asia",
  "South Sudan": "Africa",
  "Spain": "Europe",
  "Sri Lanka": "Asia",
  "Sudan": "Africa",
  "Suriname": "South America",
  "Sweden": "Europe",
  "Switzerland": "Europe",
  "Syria": "Asia",
  "Tajikistan": "Asia",
  "Tanzania": "Africa",
  "Thailand": "Asia",
  "Timor-Leste": "Asia",
  "Togo": "Africa",
  "Tonga": "Oceania",
  "Trinidad and Tobago": "North America",
  "Tunisia": "Africa",
  "Turkey": "Europe", // Parte en Asia
  "Turkmenistan": "Asia",
  "Tuvalu": "Oceania",
  "Uganda": "Africa",
  "Ukraine": "Europe",
  "United Arab Emirates": "Asia",
  "United Kingdom": "Europe",
  "United States of America": "North America",
  "Uruguay": "South America",
  "Uzbekistan": "Asia",
  "Vanuatu": "Oceania",
  "Venezuela": "South America",
  "Vietnam": "Asia",
  "Yemen": "Asia",
  "Zambia": "Africa",
  "Zimbabwe": "Africa",
};

const TOTAL_COUNTRIES = 195; // Total de países

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleCountrySelect = (countries) => {
    setSelectedCountries(countries);
  };

  const getVisitedContinents = () => {
    const visitedContinents = new Set(
      selectedCountries.map((country) => continentMapping[country])
    );
    return visitedContinents.size;
  };

  const getVisitedCountriesCount = () => {
    return selectedCountries.length;
  };

  const getVisitedPercentage = () => {
    return ((selectedCountries.length / TOTAL_COUNTRIES) * 100).toFixed(2);
  };

  return (
    <Router>
      <div>
        <header className="header">
          <nav className="navbar">
            <div className="logo">
              <span role="img" aria-label="globo">
                🌍
              </span>
              <span>Travel-map generator</span>
            </div>
            <HamburgerMenu />
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <main className="main">
                <section id="map-generator">
                  <h1 className="main-title">Travel. Select. Generate.</h1>
                  <p className="main-description">
                    Create a personalized travel map showcasing the countries you've visited. Share your adventures with friends and plan your next destination!
                  </p>
                  <div className="map-container">
                    <MapComponent selectedCountries={selectedCountries} />
                  </div>
                  <div className="stats-container">
                    <StatsCard
                      continents={getVisitedContinents()}
                      countries={getVisitedCountriesCount()}
                      percentage={getVisitedPercentage()}
                      visitedCountries={selectedCountries}
                    />
                  </div>
                  <div className="country-selector-container">
                    <CountrySelector
                      onCountrySelect={handleCountrySelect}
                      selectedCountries={selectedCountries}
                    />
                  </div>
                </section>
              </main>
            }
          />
          <Route path="/about" element={<About />} /> {/* Ruta para la página About */}
        </Routes>
        <footer>
          <p>
            Made with <span style={{ color: "red" }}>❤</span> by Alberto Bort
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;