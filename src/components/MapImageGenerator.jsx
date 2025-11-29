import React, { forwardRef, useCallback } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../data/world-110m.json';
import { FaGlobeAmericas, FaPlaneDeparture } from 'react-icons/fa';

const MapImageGenerator = forwardRef((
  {
    selectedCountries,
    visitedCountriesCount,
    visitedPercentage
  }, ref) => {

  // CONFIGURACIÓN DE MAPA
  // Ajustamos el zoom un poco para asegurar que TODO el mundo (NZ, Alaska, etc.) entre cómodamente.
  const initialCenter = [25, 0]; 
  const initialZoom = 1.45; // Zoom ligeramente reducido para márgenes de seguridad

  // ESTILOS DE LUJO
  const GOLD_COLOR = "#D4AF37"; 
  const DEEP_NAVY = "#0F172A"; 
  const MAP_FILL_DEFAULT = "#F1F5F9"; 
  const MAP_STROKE = "#FFFFFF"; 

  const styleFeature = useCallback((feature) => {
    const isSelected = selectedCountries.includes(feature.properties.ADMIN);
    return {
      fillColor: isSelected ? GOLD_COLOR : MAP_FILL_DEFAULT,
      fillOpacity: 1,
      color: MAP_STROKE,
      weight: 0.6, 
      dashArray: "", 
    };
  }, [selectedCountries]);

  const sortedSelectedCountries = [...selectedCountries].sort();

  return (
    // CONTENEDOR PRINCIPAL (EL LIENZO)
    <div
      ref={ref}
      className="flex flex-col items-center relative box-border"
      style={{
        width: '1200px', 
        // Aumentamos altura para evitar cortes en la lista de países
        minHeight: '1800px', 
        padding: '80px',
        backgroundColor: '#FFFEFA', 
        fontFamily: "'Inter', sans-serif",
        color: DEEP_NAVY
      }}
    >
      {/* Inyección de Fuente Serif */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');`}
      </style>

      {/* --- MARCO DECORATIVO --- */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          margin: '30px', 
          border: `1px solid ${DEEP_NAVY}`, 
          opacity: 0.1 
        }} 
      />

      {/* --- HEADER EDITORIAL --- */}
      <header className="w-full text-center mb-16 relative z-10">
        {/* Título con más margen inferior para que no se monte */}
        <div className="inline-block border-b-2 border-slate-900 pb-6 mb-8">
          <h1 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '90px', // Un poco más grande para impacto
              lineHeight: '1.1', // Más altura de línea para evitar choques con ascendentes/descendentes
              letterSpacing: '-0.02em',
              color: DEEP_NAVY,
              marginBottom: '10px' // Margen extra de seguridad
            }}
          >
            World Traveler
          </h1>
        </div>
        
        {/* Subtítulo alineado perfectamente */}
        <div className="flex justify-center items-center gap-12 text-lg font-medium tracking-widest uppercase text-slate-500">
          <div className="flex items-center gap-3 h-6">
            <FaPlaneDeparture style={{ color: GOLD_COLOR, fontSize: '1.2em' }} />
            <span style={{ paddingTop: '2px' }}>The Journey So Far</span>
          </div>
          <span className="text-slate-300 h-6 flex items-center">•</span>
          <div className="flex items-center gap-3 h-6">
            <span style={{ paddingTop: '2px' }}>{new Date().getFullYear()} Edition</span>
          </div>
        </div>
      </header>

      {/* --- ESTADÍSTICAS DESTACADAS (HERO) --- */}
      {/* Alineación corregida: Ambos bloques centrados en su columna */}
      <div className="w-full grid grid-cols-2 gap-0 mb-12 px-20">
        <div className="flex flex-col items-center border-r border-slate-200 py-2">
          <span className="block text-7xl font-bold text-slate-900 leading-none mb-3">
            {visitedCountriesCount}
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Countries Visited
          </span>
        </div>
        <div className="flex flex-col items-center py-2">
          <span className="block text-7xl font-bold text-slate-900 leading-none mb-3">
            {visitedPercentage}%
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Global Coverage
          </span>
        </div>
      </div>

      {/* --- MAPA CENTRAL --- */}
      <div 
        className="w-full relative mb-16"
        style={{ height: '750px' }} // Un poco más alto
      >
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          zoomControl={false}
          attributionControl={false}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          preferCanvas={true}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <GeoJSON
            data={countriesData.features}
            style={styleFeature}
          />
        </MapContainer>
      </div>

      {/* --- LISTA DE DESTINOS --- */}
      {sortedSelectedCountries.length > 0 && (
        <div className="w-full mt-8 mb-16"> {/* Margen inferior extra para que no pegue al footer */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h3 
              className="text-xl font-bold uppercase tracking-widest text-slate-900 px-4"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              Visited Destinations Check-list
            </h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div 
            className="grid grid-cols-5 gap-y-4 gap-x-8 text-left w-full px-8"
            style={{ fontSize: '14px' }} 
          >
            {sortedSelectedCountries.map(country => (
              <div key={country} className="flex items-start gap-3 text-slate-600 leading-tight">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" 
                  style={{ backgroundColor: GOLD_COLOR }}
                />
                <span className="">{country}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- FOOTER DE MARCA --- */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
          <FaGlobeAmericas />
          <span>Generated with TravelMap</span>
        </div>
      </div>
    </div>
  );
});

export default MapImageGenerator;