import React, { forwardRef, useCallback } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../data/world-110m.json';

const MapImageGenerator = forwardRef((
  { 
    selectedCountries, 
    visitedCountriesCount, 
    visitedPercentage 
  }, ref) => {
    
  // Configuración estática para la imagen
  const initialCenter = [20, 0];
  const initialZoom = 1.6;

  // Estilo minimalista para exportación
  const styleFeature = useCallback((feature) => {
    const isSelected = selectedCountries.includes(feature.properties.ADMIN);
    return {
      fillColor: isSelected ? "#0F766E" : "#F1F5F9", // Primary Teal vs Slate-100
      fillOpacity: 1,
      color: isSelected ? "#0F766E" : "#CBD5E1", // Borde igual al relleno o Slate-300
      weight: isSelected ? 0 : 0.5, // Sin borde en seleccionados para look "plano" moderno
    };
  }, [selectedCountries]);

  const sortedSelectedCountries = [...selectedCountries].sort();

  return (
    <div className="fixed left-[-9999px]"> {/* Oculto visualmente pero renderizable */}
      <div 
        ref={ref} 
        className="bg-white p-12 flex flex-col items-center" 
        style={{ 
          width: '1200px', // Ancho fijo HD
          fontFamily: "'Poppins', sans-serif" // Aseguramos fuente en export
        }} 
      >
        {/* Header de la Tarjeta */}
        <div className="w-full flex justify-between items-end border-b-2 border-slate-100 pb-6 mb-8">
          <div className="text-left">
            <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
              My Travel Map
            </h1>
            <p className="text-xl text-slate-500 mt-2 font-medium">
              Alberto's World Adventures
            </p>
          </div>
          
          {/* Stats Badge */}
          <div className="flex gap-6">
            <div className="text-right">
              <span className="block text-4xl font-bold text-teal-700">{visitedCountriesCount}</span>
              <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Countries</span>
            </div>
            <div className="text-right">
              <span className="block text-4xl font-bold text-teal-700">{visitedPercentage}%</span>
              <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">World</span>
            </div>
          </div>
        </div>

        {/* Mapa Limpio */}
        <div 
          className="relative rounded-3xl overflow-hidden border-4 border-slate-100"
          style={{ width: '1100px', height: '600px', margin: '0 auto' }}
        >
          <MapContainer
            center={initialCenter}
            zoom={initialZoom}
            zoomControl={false}
            attributionControl={false}
            style={{ width: '100%', height: '100%', background: '#F8FAFC' }} // Fondo Slate-50
            preferCanvas={true}
          >
            <GeoJSON
              data={countriesData.features}
              style={styleFeature}
            />
          </MapContainer>
        </div>

        {/* Footer / Lista de Países */}
        {sortedSelectedCountries.length > 0 && (
          <div className="w-full mt-10 px-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-teal-600 rounded-full block"></span>
              Visited Destinations
            </h3>
            
            <div 
              className="text-lg text-slate-600 font-medium leading-relaxed"
              style={{ 
                columnCount: 4, 
                columnGap: '40px',
                textAlign: 'left'
              }}
            >
              {sortedSelectedCountries.map(country => (
                <div key={country} className="mb-2 break-inside-avoid hover:text-teal-700 transition-colors">
                  • {country}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branding Footer */}
        <div className="w-full mt-12 pt-6 border-t border-slate-100 flex justify-between items-center text-slate-400">
          <span className="text-lg">Generated with <strong>TravelMap</strong></span>
          <span className="text-lg">{new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
});

export default MapImageGenerator;