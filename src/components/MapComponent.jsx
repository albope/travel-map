// src/components/MapComponent.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json";

const MapComponent = ({ selectedCountries }) => {
  const styleFeature = (feature) => {
    const countryName = feature.properties.ADMIN;

    if (selectedCountries.includes(countryName)) {
      return {
        fillColor: "#FF0000", // Rojo para países seleccionados
        fillOpacity: 0.5,
        color: "#FF0000", // Borde rojo
        weight: 2,
      };
    } else {
      return {
        fillColor: "#3388ff", // Azul por defecto
        fillOpacity: 0.2,
        color: "#3388ff", // Borde azul
        weight: 1,
      };
    }
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.on({
      click: () => {
        console.log(`Hiciste clic en ${countryName}`);
      },
    });
  };

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={countriesData.features}
          style={styleFeature}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;