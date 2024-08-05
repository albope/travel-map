// src/components/MapComponent.jsx
import React from "react";
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

  // Establecer los límites para que el mapa sea visible
  const worldBounds = [
    [-60, -180], // Suroeste
    [85, 180],   // Noreste
  ];

  return (
    <div className="map-wrapper" style={{ overflow: "hidden", padding: 0 }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "600px", width: "100%", margin: 0, padding: 0 }}
        className="leaflet-container"
        minZoom={2}
        maxZoom={5}
        scrollWheelZoom={true}
        maxBounds={worldBounds} // Usar límites del mundo para que el mapa se recorte correctamente
        maxBoundsViscosity={1.0} // Viscosidad para mantener el mapa dentro de los límites
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