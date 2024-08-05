// src/components/CountrySelector.jsx
import React, { useState } from "react";
import { Tabs, Tab, Box, Checkbox, FormControlLabel } from "@mui/material";
import countriesData from "../data/world-110m.json";

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
  // Algunos territorios adicionales
  "Saint Barthelemy": "North America",
  "Bermuda": "North America",
  "Federated States of Micronesia": "Oceania",
  "Dhekelia Sovereign Base Area": "Europe",
  "French Southern and Antarctic Lands": "Antarctica",
  "Faroe Islands": "Europe",
  "Guernsey": "Europe",
  "Grenada": "North America",
  "British Indian Ocean Territory": "Africa",
  "Akrotiri Sovereign Base Area": "Europe",
  "Ashmore and Cartier Islands": "Oceania",
  "Falkland Islands": "South America",
  "Guam": "Oceania",
  "Heard Island and McDonald Islands": "Antarctica",
  "Palestine": "Asia",
  "Macau S.A.R": "Asia",
  "Pitcairn Islands": "Oceania",
  "Saint Pierre and Miquelon": "North America",
  "Vatican": "Europe",
  "United States Virgin Islands": "North America",
  "French Polynesia": "Oceania",
  "New Caledonia": "Oceania",
  "Norfolk Island": "Oceania",
  "Nauru": "Oceania",
  "Siachen Glacier": "Asia",
  "Samoa": "Oceania",
  "Saint Martin": "North America",
  "Sint Maarten": "North America",
  "Serranilla Bank": "North America",
  "Scarborough Reef": "Asia",
  "Spratly Islands": "Asia",
  "Svalbard and Jan Mayen": "Europe",
  "US Naval Base Guantanamo Bay": "North America",
  "Wallis and Futuna": "Oceania",
  "Western Sahara": "Africa",
  "Hong Kong S.A.R.": "Asia",
  "Indian Ocean Territories": "Asia",
  "French Southern and Antarctic Lands": "Antarctica"
};

// Definir los continentes disponibles
const continents = ["Africa", "Asia", "North America", "South America", "Europe", "Oceania"];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const CountrySelector = ({ onCountrySelect, selectedCountries }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCountryChange = (country) => {
    let updatedCountries;
    
    if (selectedCountries.includes(country)) {
      // Eliminar el país si ya está seleccionado
      updatedCountries = selectedCountries.filter((c) => c !== country);
    } else {
      // Añadir el país si no está seleccionado
      updatedCountries = [...selectedCountries, country];
    }

    // Propagar el cambio al componente padre
    onCountrySelect(updatedCountries);

    // Debugging: Mostrar el estado actualizado
    console.log("Países seleccionados actualizados: ", updatedCountries);
  };

  const getCountriesByContinent = (continent) => {
    const countries = countriesData.features
      .filter((feature) => {
        const countryName = feature.properties.ADMIN;
        return continentMapping[countryName] === continent;
      })
      .map((feature) => feature.properties.ADMIN);

    return countries;
  };

  return (
    <div className="country-selector">
      <Tabs value={value} onChange={handleTabChange} aria-label="country tabs">
        {continents.map((continent, index) => (
          <Tab key={continent} label={continent} id={`tab-${index}`} />
        ))}
      </Tabs>
      {continents.map((continent, index) => (
        <TabPanel key={continent} value={value} index={index}>
          <div className="country-list">
            {getCountriesByContinent(continent).map((country) => (
              <FormControlLabel
                key={country}
                control={
                  <Checkbox
                    checked={selectedCountries.includes(country)}
                    onChange={() => handleCountryChange(country)}
                    name={country}
                  />
                }
                label={country}
              />
            ))}
          </div>
        </TabPanel>
      ))}
    </div>
  );
};

export default CountrySelector;