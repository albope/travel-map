// src/components/MapComponent.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json";

const ResetZoomControl = ({ initialZoom }) => {
  const map = useMap();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleZoomEnd = () => {
      if (map.getZoom() !== initialZoom) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map, initialZoom]);

  useEffect(() => {
    if (showButton) {
      const resetZoomButton = L.control({ position: "topleft" });

      resetZoomButton.onAdd = function () {
        const div = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
        div.innerHTML = "&#x21bb;"; // Unicode para el símbolo de recargar (↻)
        div.style.fontSize = "18px";
        div.style.width = "30px";
        div.style.height = "30px";
        div.style.lineHeight = "30px";
        div.style.textAlign = "center";
        div.style.cursor = "pointer";
        div.title = "Reset Zoom";

        div.onclick = function () {
          map.setView([20, 0], initialZoom); // Centrar el mapa en la vista original con el zoom inicial
        };

        return div;
      };

      resetZoomButton.addTo(map);

      return () => {
        map.removeControl(resetZoomButton);
      };
    }
  }, [showButton, map, initialZoom]);

  return null;
};

const MapComponent = ({ selectedCountries }) => {
  const initialZoom = 2;

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
    <div id="map-container" className="map-wrapper" style={{ overflow: "hidden", padding: 0 }}>
      <MapContainer
        center={[20, 0]}
        zoom={initialZoom}
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
        <ResetZoomControl initialZoom={initialZoom} /> {/* Añadir el botón de reinicio de zoom */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;