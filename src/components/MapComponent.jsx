import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json";
import ShareButtons from './ShareButtons'; // Importar el componente de compartir

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
        div.innerHTML = "&#x21bb;";
        div.style.fontSize = "18px";
        div.style.width = "30px";
        div.style.height = "30px";
        div.style.lineHeight = "30px";
        div.style.textAlign = "center";
        div.style.cursor = "pointer";
        div.title = "Reset Zoom";

        div.onclick = function () {
          map.setView([20, 0], initialZoom);
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
  const initialZoom = window.innerWidth < 768 ? 1 : 2; // Ajuste de zoom para dispositivos móviles
  const minZoom = window.innerWidth < 768 ? 1 : 2; // Ajuste de zoom mínimo para dispositivos móviles
  const maxZoom = window.innerWidth < 768 ? 4 : 5; // Ajuste de zoom máximo para dispositivos móviles

  const styleFeature = (feature) => {
    const countryName = feature.properties.ADMIN;

    if (selectedCountries.includes(countryName)) {
      return {
        fillColor: "#FF0000",
        fillOpacity: 0.5,
        color: "#FF0000",
        weight: 2,
      };
    } else {
      return {
        fillColor: "#3388ff",
        fillOpacity: 0.2,
        color: "#3388ff",
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

  const getVisitedCountriesCount = () => selectedCountries.length;
  const getVisitedPercentage = () => ((selectedCountries.length / 195) * 100).toFixed(2);

  const worldBounds = [
    [-60, -180],
    [85, 180],
  ];

  return (
    <div id="map-container" className="map-wrapper" style={{ overflow: "hidden", padding: 0 }}>
      <MapContainer
        center={[20, 0]}
        zoom={initialZoom}
        style={{ height: window.innerWidth < 768 ? "400px" : "600px", width: "100%", margin: 0, padding: 0 }}
        className="leaflet-container"
        minZoom={minZoom}
        maxZoom={maxZoom}
        scrollWheelZoom={true}
        maxBounds={worldBounds}
        maxBoundsViscosity={1.0}
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
        <ResetZoomControl initialZoom={initialZoom} />
      </MapContainer>

      {/* Componente de compartir debajo del mapa */}
      <ShareButtons
        countriesVisited={getVisitedCountriesCount()}
        worldPercentage={getVisitedPercentage()}
      />
    </div>
  );
};

export default MapComponent;