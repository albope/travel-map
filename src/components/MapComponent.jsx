import React, { useEffect, useRef, useCallback, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../data/world-110m.json"; 
import { FaCompressArrowsAlt } from "react-icons/fa";

// Botón de Reset Flotante
const ResetZoomControl = ({ map, initialCenter, initialZoom }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!map) return;
    
    const checkState = () => {
      const currentZoom = map.getZoom();
      const currentCenter = map.getCenter();
      const isMoved = 
        currentZoom !== initialZoom || 
        Math.abs(currentCenter.lat - initialCenter[0]) > 0.1 || 
        Math.abs(currentCenter.lng - initialCenter[1]) > 0.1;
      
      setIsVisible(isMoved);
    };

    map.on('zoomend moveend', checkState);
    return () => map.off('zoomend moveend', checkState);
  }, [map, initialCenter, initialZoom]);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => map.setView(initialCenter, initialZoom, { animate: true })}
      className="absolute top-4 right-4 z-[400] bg-white text-text-main p-2 rounded-lg shadow-card hover:bg-slate-50 text-xs font-bold tracking-wide flex items-center gap-2 transition-all transform hover:scale-105 border border-slate-100"
    >
      <FaCompressArrowsAlt />
      <span>RESET</span>
    </button>
  );
};

const MapComponent = ({ selectedCountries, onCountrySelect, onMapReady }) => {
  const mapRef = useRef(null);
  
  // --- SOLUCIÓN AL BUG DEL COLOR (STALE CLOSURE) ---
  // Creamos una referencia que SIEMPRE tiene el valor actual de selectedCountries.
  // Los eventos del mapa leerán de aquí en lugar de la prop directamente.
  const selectedCountriesRef = useRef(selectedCountries);

  useEffect(() => {
    selectedCountriesRef.current = selectedCountries;
  }, [selectedCountries]);
  // --------------------------------------------------

  const initialCenter = [20, 0];
  const initialZoom = window.innerWidth < 768 ? 1.5 : 2;
  const minZoom = 1.5;

  // Función auxiliar para obtener estilos (pura)
  const getFeatureStyle = (feature, countryList) => {
    const isSelected = countryList.includes(feature.properties.ADMIN);
    return {
      fillColor: isSelected ? "#0F766E" : "transparent",
      fillOpacity: isSelected ? 0.8 : 0,
      color: isSelected ? "#0D9488" : "#94A3B8",
      weight: isSelected ? 1 : 0.5,
      dashArray: isSelected ? "" : "3",
    };
  };

  // Estilo para el renderizado inicial de React
  const getStyle = useCallback((feature) => {
    return getFeatureStyle(feature, selectedCountries);
  }, [selectedCountries]);

  const onEachFeature = useCallback((feature, layer) => {
    const countryName = feature.properties.ADMIN;
    
    layer.bindTooltip(countryName, { 
      sticky: true, 
      className: 'bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded border-0 shadow-lg' 
    });

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        // Leemos de la REF para saber si ESTE país está seleccionado AHORA MISMO
        const isSelected = selectedCountriesRef.current.includes(countryName);
        
        layer.setStyle({
          fillOpacity: 0.9,
          weight: 2,
          color: isSelected ? "#115E59" : "#64748B",
          fillColor: isSelected ? "#0F766E" : "#E2E8F0"
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        const layer = e.target;
        // IMPORTANTE: Al salir el ratón, restauramos el estilo basándonos en la REF actualizada.
        // Esto evita que se "borre" el color verde si acabamos de seleccionarlo.
        const currentStyle = getFeatureStyle(feature, selectedCountriesRef.current);
        layer.setStyle(currentStyle);
      },
      click: () => {
        // Ejecutamos la acción de selección
        if (onCountrySelect) onCountrySelect(countryName);
      }
    });
  }, [onCountrySelect]); // Ya no dependemos de selectedCountries ni getStyle aquí, evitando re-renders masivos del mapa

  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady(mapRef.current);
    }
  }, [onMapReady]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200">
      <MapContainer
        ref={mapRef}
        center={initialCenter}
        zoom={initialZoom}
        minZoom={minZoom}
        style={{ height: "100%", width: "100%", background: "transparent" }}
        zoomControl={false}
        scrollWheelZoom={true}
        className="outline-none"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
          zIndex={500}
        />

        <GeoJSON
          data={countriesData.features}
          style={getStyle}
          onEachFeature={onEachFeature}
        />

        <ZoomControl position="bottomright" />
        
        {mapRef.current && (
          <ResetZoomControl 
            map={mapRef.current} 
            initialCenter={initialCenter} 
            initialZoom={initialZoom} 
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;