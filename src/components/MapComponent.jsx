import React, { useRef, useCallback, useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json";
import { FaSyncAlt } from "react-icons/fa";

const ResetZoomControl = ({ initialZoom, initialCenter }) => {
  const [showButton, setShowButton] = useState(false);
  const map = useMapEvents({
    zoomend: () => setShowButton(map.getZoom() !== initialZoom),
    moveend: () => setShowButton(map.getZoom() !== initialZoom)
  });

  useEffect(() => {
    // Establece el estado inicial del botón al montar
    if (map) { // Asegúrate de que map esté inicializado
        setShowButton(map.getZoom() !== initialZoom);
    }
  }, [map, initialZoom]);

  if (!showButton) return null;

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar leaflet-control-zoom">
        <button
          onClick={() => map.setView(initialCenter, initialZoom)}
          title="Reset Zoom"
          className="leaflet-control-zoom-in"
          style={{ fontSize: '1.2em', lineHeight: '1.4' }}
        >
          <FaSyncAlt />
        </button>
      </div>
    </div>
  );
};

const MapComponent = ({ selectedCountries, onCountrySelect }) => {
  // No necesitamos geoJsonRef si no vamos a manipular las capas imperativamente
  // const geoJsonRef = useRef(null); 
  const initialCenter = [20, 0];
  const initialZoom = window.innerWidth < 768 ? 1 : 2;

  // styleFeature ahora depende de selectedCountries.
  // Cuando selectedCountries cambia, se crea una nueva instancia de styleFeature.
  const styleFeature = useCallback((feature) => {
    const countryName = feature.properties.ADMIN;
    const isSelected = selectedCountries.includes(countryName);
    return {
      fillColor: isSelected ? "#FF6B6B" : "#A8DADC",
      fillOpacity: 0.7,
      color: isSelected ? "#C0392B" : "#1D3557",
      weight: 1,
    };
  }, [selectedCountries]);

  // Eliminamos el useEffect que recorría geoJsonRef.current.eachLayer(...)
  // Ahora confiamos en la 'key' del GeoJSON para forzar el re-renderizado con el nuevo estilo.

  const onEachCountry = useCallback((country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);

    layer.off('mouseover mouseout click'); 
    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 2.5, fillOpacity: 0.9 }),
      mouseout: (e) => {
        // Al salir, aplicamos el estilo que corresponde según el estado actual.
        // Esto es importante para que no se quede el estilo de hover.
        const currentStyle = styleFeature(e.target.feature);
        e.target.setStyle(currentStyle);
      },
      click: () => {
        if (!onCountrySelect) return;
        onCountrySelect(countryName); 
      }
    });
  }, [onCountrySelect, styleFeature]); // styleFeature depende de selectedCountries

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: "600px", width: "100%" }}
      className="leaflet-container"
      minZoom={2}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <GeoJSON
        // data no cambia, así que no necesita ser una dependencia de la key
        data={countriesData.features}
        style={styleFeature} // Esta función se usará al (re)crear la capa
        onEachFeature={onEachCountry}
        // ESTA KEY ES CRUCIAL:
        // Cuando selectedCountries cambia, styleFeature y onEachCountry se recrean (por useCallback).
        // Al cambiar la key, React desmonta el GeoJSON viejo y monta uno nuevo,
        // forzando a que use las nuevas funciones styleFeature y onEachCountry.
        key={JSON.stringify(selectedCountries)} 
      />
      <ResetZoomControl initialZoom={initialZoom} initialCenter={initialCenter} />
    </MapContainer>
  );
};

export default MapComponent;