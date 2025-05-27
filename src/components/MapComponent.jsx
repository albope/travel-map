import React, { useEffect, useRef, useCallback, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json"; // Ajusta la ruta si es necesario
import { FaSyncAlt } from "react-icons/fa";

const ResetZoomControl = ({ map, initialZoom, initialCenter }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!map) return;
    const updateShowButton = () => {
      let shouldShow = false;
      if (map.getZoom() !== initialZoom) {
        shouldShow = true;
      } else {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== initialCenter[0] || currentCenter.lng !== initialCenter[1]) {
          shouldShow = true;
        }
      }
      setShowButton(shouldShow);
    };
    map.on('zoomend', updateShowButton);
    map.on('moveend', updateShowButton);
    updateShowButton();
    return () => {
      map.off('zoomend', updateShowButton);
      map.off('moveend', updateShowButton);
    };
  }, [map, initialZoom, initialCenter]);

  if (!showButton || !map) return null;

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control mt-2.5">
        <button
          onClick={() => map.setView(initialCenter, initialZoom)}
          title="Reset Zoom"
          className="flex items-center justify-center w-[30px] h-[30px] bg-white text-gray-700 border border-gray-300 rounded shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaSyncAlt size={14} />
        </button>
      </div>
    </div>
  );
};

const MapComponent = ({ selectedCountries, onCountrySelect, onMapReady }) => {
  const initialCenter = [20, 0];
  const initialZoom = window.innerWidth < 768 ? 1 : 2;
  const minZoomForUserInteraction = 2;
  const mapRef = useRef(null);

  const styleFeature = useCallback((feature) => {
    const countryName = feature.properties.ADMIN;
    const isSelected = selectedCountries.includes(countryName);
    if (isSelected) {
        return { 
            fillColor: "#FF6B6B", 
            fillOpacity: 0.7,
            color: "#C0392B",     
            weight: 1.5,
        };
    } else {
        return { 
            fillOpacity: 0,      
            opacity: 0.3, 
            color: "#A0AEC0", 
            weight: 0.5,     
        };
    }
  }, [selectedCountries]);

  const onEachCountry = useCallback((country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.off('mouseover mouseout click');
    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 2.5, fillOpacity: 0.9 }),
      mouseout: (e) => {
        e.target.setStyle(styleFeature(e.target.feature));
      },
      click: () => {
        if (!onCountrySelect) return;
        onCountrySelect(countryName);
      }
    });
  }, [onCountrySelect, styleFeature]);

  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady(mapRef.current);
    }
  }, [mapRef, onMapReady]);

  return (
    <MapContainer
      ref={mapRef}
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: "500px", width: "100%" }}
      className="leaflet-container"
      minZoom={minZoomForUserInteraction}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // <-- OpenStreetMap Tiles
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={countriesData.features}
        style={styleFeature}
        onEachFeature={onEachCountry}
        key={JSON.stringify(selectedCountries)}
      />
      {mapRef.current && <ResetZoomControl map={mapRef.current} initialZoom={initialZoom} initialCenter={initialCenter} />}
    </MapContainer>
  );
};

export default MapComponent;