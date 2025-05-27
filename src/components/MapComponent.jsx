import React, { useEffect, useRef, useCallback, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json";
import { FaSyncAlt } from "react-icons/fa";

// ResetZoomControl (sin cambios respecto a la última versión que te di)
const ResetZoomControl = ({ map, initialZoom, initialCenter }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!map) return;
    const updateShowButton = () => {
      if (map.getZoom() !== initialZoom) {
        setShowButton(true);
      } else {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== initialCenter[0] || currentCenter.lng !== initialCenter[1]) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
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

  // CAMBIO PRINCIPAL AQUÍ:
  const styleFeature = useCallback((feature) => {
    const countryName = feature.properties.ADMIN;
    const isSelected = selectedCountries.includes(countryName);
    return {
      fillColor: isSelected ? "#FF6B6B" : "transparent", // <--- PAÍSES NO SELECCIONADOS TRANSPARENTES
      fillOpacity: isSelected ? 0.7 : 0,             // <--- Opacidad 0 para el relleno transparente
      color: isSelected ? "#C0392B" : "#6B7280",     // <--- Borde para seleccionados y un gris para no seleccionados
      weight: isSelected ? 1.5 : 0.5,                     // <--- Peso del borde (más fino para no seleccionados)
    };
  }, [selectedCountries]);

  const onEachCountry = useCallback((country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.off('mouseover mouseout click'); 
    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 2.5, fillOpacity: 0.9 }),
      mouseout: (e) => e.target.setStyle(styleFeature(e.target.feature)),
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
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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