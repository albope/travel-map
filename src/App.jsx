import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import CountrySelector from "./components/CountrySelector";
import StatsCard from "./components/StatsCard";
import About from "./components/About";
import HamburgerMenu from "./components/HamburgerMenu";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import FeedbackModal from "./components/FeedbackModal";  // Importa el componente FeedbackModal
import domtoimage from "dom-to-image";
import ShareButtons from './components/ShareButtons';
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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // Estado para mostrar el modal de feedback
  const mapRef = useRef(null);
  const feedbackButtonRef = useRef(null); // Referencia para el botón de feedback

  const handleCountrySelect = (countries) => {
    setSelectedCountries(countries);
  };

  const getVisitedContinents = () => {
    const visitedContinents = new Set(
      selectedCountries.map(country => continentMapping[country])
    );
    return visitedContinents.size;
  };

  const getVisitedCountriesCount = () => {
    return selectedCountries.length;
  };

  const getVisitedPercentage = () => {
    return ((selectedCountries.length / TOTAL_COUNTRIES) * 100).toFixed(2);
  };

  const handleDownload = () => {
    const mapElement = mapRef.current;
    if (mapElement) {
      const tempContainer = document.createElement("div");
      tempContainer.style.border = "2px solid black";
      tempContainer.style.backgroundColor = "white";
      tempContainer.style.position = "relative";
      tempContainer.style.width = "1400px";
      tempContainer.style.height = "auto";
      tempContainer.style.overflow = "hidden";
      tempContainer.style.display = "flex";
      tempContainer.style.flexDirection = "column";
      tempContainer.style.alignItems = "center";

      const title = document.createElement("h1");
      title.textContent = "My Travel Map";
      title.style.textAlign = "center";
      title.style.marginBottom = "20px";
      tempContainer.appendChild(title);

      const subtitle = document.createElement("p");
      subtitle.innerHTML = `You have visited <span style="font-weight: bold;">${getVisitedPercentage()}%</span> of the world!`;
      subtitle.style.marginBottom = "20px";
      tempContainer.appendChild(subtitle);

      const mapClone = mapElement.cloneNode(true);
      mapClone.style.width = "1300px";
      mapClone.style.height = "600px";
      mapClone.style.position = "relative";
      mapClone.style.marginBottom = "10px";
      tempContainer.appendChild(mapClone);

      const visitedCountriesContainer = document.createElement("div");
      visitedCountriesContainer.style.padding = "10px";
      visitedCountriesContainer.style.width = "1300px";
      visitedCountriesContainer.style.textAlign = "center";
      visitedCountriesContainer.style.fontSize = "14px";
      visitedCountriesContainer.style.position = "relative";
      visitedCountriesContainer.style.top = "-20px";

      const visitedCountriesTitle = document.createElement("h3");
      visitedCountriesTitle.textContent = "Countries You Have Visited:";
      visitedCountriesContainer.appendChild(visitedCountriesTitle);

      const visitedCountriesList = document.createElement("p");
      visitedCountriesList.textContent = selectedCountries.join(", ");
      visitedCountriesContainer.appendChild(visitedCountriesList);

      tempContainer.appendChild(visitedCountriesContainer);

      document.body.appendChild(tempContainer);

      const zoomControls = tempContainer.querySelector(".leaflet-control-zoom");
      if (zoomControls) {
        zoomControls.style.display = "none";
      }

      const attribution = tempContainer.querySelector(".leaflet-control-attribution");
      if (attribution) {
        attribution.style.display = "none";
      }

      domtoimage.toPng(tempContainer)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "Countries_visited.png";
          link.click();

          document.body.removeChild(tempContainer);
        })
        .catch((error) => {
          console.error("Error generating image:", error);
          document.body.removeChild(tempContainer);
        });
    }
  };

  return (
    <Router>
      <div>
        <header className="header">
          <nav className="navbar">
            <Link to="/" className="logo" style={{ cursor: 'pointer', color: 'white', textDecoration: 'none' }}>
              <span role="img" aria-label="globo">🌍</span>
              <span>Travel-map generator</span>
            </Link>
            <div className="right-section">
              <button ref={feedbackButtonRef} className="feedback-button" onClick={() => setShowFeedbackModal(true)}>
                Feedback
              </button>
              <HamburgerMenu />
            </div>
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
                    Create a personalized travel map showcasing the countries you've visited marking them in the <strong><a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('country-selector-container');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      style={{
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#0056b3'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#007bff'}
                    >
                      'Countries I have been to..'
                    </a></strong> section. Share your adventures with friends and plan your next destination!
                  </p>
                  <div className="map-container" ref={mapRef}>
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
                  <div id="country-selector-container" className="country-selector-container">
                    <CountrySelector
                      onCountrySelect={handleCountrySelect}
                      selectedCountries={selectedCountries}
                    />
                  </div>
                  <div className="actions-container" id="actions-section">
                    <button className="download-button" onClick={handleDownload}>
                      Download Map in PNG
                    </button>
                    <span className="or-separator">OR</span>
                    <ShareButtons
                      countriesVisited={getVisitedCountriesCount()}
                      worldPercentage={getVisitedPercentage()}
                    />
                  </div>
                </section>
                <button
                  onClick={() => {
                    document.getElementById("actions-section").scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000
                  }}
                >
                  Scroll Down to Share/Download
                </button>
              </main>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
        <footer>
          <p>
            Made with <span style={{ color: "red" }}>❤</span> by Alberto Bort
          </p>
        </footer>

        {showFeedbackModal && (
          <FeedbackModal onClose={() => setShowFeedbackModal(false)} triggerRef={feedbackButtonRef} />
        )}
      </div>
    </Router>
  );
};

export default App;