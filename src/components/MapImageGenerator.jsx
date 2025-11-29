import React, { forwardRef, useCallback } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../data/world-110m.json';
import { FaGlobeAmericas } from 'react-icons/fa';

const MapImageGenerator = forwardRef((
  {
    selectedCountries,
    visitedCountriesCount,
    visitedPercentage
  }, ref) => {

  // CONFIGURACIÓN DE MAPA (Panorámico)
  const initialCenter = [28, 0]; 
  const initialZoom = 1.6; 

  // ESTILOS SWISS / MODERN
  const GOLD_COLOR = "#D4AF37"; 
  const DARK_INK = "#111111"; // Negro casi puro
  const MAP_FILL_DEFAULT = "#F3F4F6"; // Gris muy claro para países no visitados
  const MAP_STROKE = "#FFFFFF"; 

  const styleFeature = useCallback((feature) => {
    const isSelected = selectedCountries.includes(feature.properties.ADMIN);
    return {
      fillColor: isSelected ? GOLD_COLOR : MAP_FILL_DEFAULT,
      fillOpacity: 1,
      color: MAP_STROKE,
      weight: 0.5, 
      dashArray: "", 
    };
  }, [selectedCountries]);

  const sortedSelectedCountries = [...selectedCountries].sort();

  return (
    // CONTENEDOR PRINCIPAL (EL LIENZO)
    <div
      ref={ref}
      className="flex flex-col relative box-border bg-white"
      style={{
        width: '1200px', 
        minHeight: '1600px', 
        padding: '80px',
        fontFamily: "'Inter', sans-serif",
        color: DARK_INK
      }}
    >
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-8 mb-16 border-b-4 border-black pb-12">
        <div className="flex justify-between items-end">
          <h1 
            className="uppercase font-black leading-none tracking-tighter"
            style={{ fontSize: '130px' }}
          >
            World<br/>Traveler
          </h1>
          
          {/* STATS CORREGIDAS: Mayor separación y alineación limpia */}
          <div className="flex flex-col items-end text-right gap-10 pb-2">
            <div className="flex flex-col items-end">
              {/* Quitamos leading-none y aumentamos margen inferior para evitar solapamiento */}
              <span className="block text-6xl font-bold tracking-tighter mb-4">{visitedCountriesCount}</span>
              <span className="text-sm font-bold uppercase tracking-widest bg-black text-white px-3 py-1.5">Countries</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="block text-6xl font-bold tracking-tighter mb-4">{visitedPercentage}%</span>
              <span className="text-sm font-bold uppercase tracking-widest bg-black text-white px-3 py-1.5">Coverage</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-lg font-bold uppercase tracking-wider text-gray-500">
          <span>The Journey So Far</span>
          <span>{new Date().getFullYear()} Collection</span>
        </div>
      </header>

      {/* --- MIDDLE: COUNTRY LIST --- */}
      <div className="flex-grow mb-16">
        {/* Alineación corregida: items-center centra el cuadrado con las mayúsculas */}
        <h3 className="text-2xl font-black uppercase tracking-widest mb-10 flex items-center gap-4">
          <span className="w-4 h-4 bg-black block flex-shrink-0"></span>
          <span>Checklist</span>
        </h3>
        
        {sortedSelectedCountries.length > 0 ? (
          <div 
            // GRID DE 3 COLUMNAS
            // Usamos items-start para permitir que el texto salte de línea sin romper la alineación del bullet
            className="grid grid-cols-3 gap-x-12 gap-y-6 w-full"
            style={{ fontSize: '16px', fontWeight: '600' }} 
          >
            {sortedSelectedCountries.map(country => (
              <div key={country} className="flex items-start gap-4 border-b border-gray-100 pb-2 group">
                 {/* Bullet CUADRADO, alineado con la primera línea de texto (mt-1.5) */}
                 <span className="w-2 h-2 bg-gray-300 group-hover:bg-[#D4AF37] transition-colors flex-shrink-0 mt-2"></span>
                 {/* Permitimos que el texto haga wrap (sin truncate) */}
                 <span className="text-gray-800 leading-tight">{country}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xl font-medium italic pl-8">No destinations selected yet.</p>
        )}
      </div>

      {/* --- BOTTOM: THE MAP --- */}
      <div className="w-full relative mt-auto">
        <h3 className="text-2xl font-black uppercase tracking-widest mb-6 flex items-center gap-4">
          <span className="w-4 h-4 bg-[#D4AF37] block flex-shrink-0"></span>
          <span>Visual Record</span>
        </h3>
        
        {/* Marco negro grueso para estilo Suizo */}
        <div 
          className="w-full relative border-4 border-black bg-white"
          style={{ height: '550px' }} 
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
        
        {/* FOOTER */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100 text-gray-400 text-sm font-bold uppercase tracking-widest">
           <div className="flex items-center gap-2">
             <FaGlobeAmericas />
             Generated with TravelMap
           </div>
           <div>Personal Travel History</div>
        </div>
      </div>

    </div>
  );
});

export default MapImageGenerator;