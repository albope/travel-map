import React, { forwardRef, useCallback } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../data/world-110m.json'; // Ajusta la ruta si es necesario

const MapImageGenerator = forwardRef((
  { 
    selectedCountries, 
    visitedCountriesCount, 
    visitedPercentage 
  }, ref) => {
    
  const initialCenter = [20, 0];
  // Un zoom que muestre bien el mundo sin tiles. Puedes ajustarlo.
  // Si el mapa se ve muy pequeño o muy grande en el PNG, este es un buen lugar para ajustar.
  const initialZoomForImage = 1.5; 

  // Estilo específico para la imagen PNG:
  // Países seleccionados en rojo, no seleccionados en un color base sólido.
  const styleFeatureForImage = useCallback((feature) => {
    const countryName = feature.properties.ADMIN;
    const isSelected = selectedCountries.includes(countryName);
    return {
      fillColor: isSelected ? "#FF6B6B" : "#E5E7EB", // Rojo para seleccionados, un gris más claro (Tailwind gray-200) para no seleccionados
      fillOpacity: 1, // Opacidad completa para ambos
      color: isSelected ? "#C0392B" : "#9CA3AF", // Borde rojo oscuro o un gris medio (Tailwind gray-400)
      weight: isSelected ? 1 : 0.5,
    };
  }, [selectedCountries]);

  // Preparamos la lista de países para mostrarla, ordenada
  const sortedSelectedCountries = [...selectedCountries].sort();

  return (
    // Contenedor principal para la imagen.
    // El ancho es fijo para consistencia, la altura es auto para acomodar la lista de países.
    // Clases de Tailwind para padding, color de fondo, y centrado de texto.
    // Estilos en línea para la fuente base y el ancho.
    <div 
        ref={ref} 
        className="bg-background p-6 text-center" 
        style={{ width: '1000px', height: 'auto', fontFamily: 'Lato, Arial, sans-serif' }} 
    >
        {/* Título */}
        <h1 
            className="font-display text-3xl font-bold text-primary mb-2"
        >
            My Travel Map
        </h1>

        {/* Subtítulo con estadísticas */}
        <p 
            className="text-md text-gray-700 mb-4" // text-gray-700 para un poco más de contraste
        >
            {visitedCountriesCount} countries visited - <span className="font-bold">{visitedPercentage}%</span> of the world!
        </p>

        {/* Contenedor del Mapa */}
        {/* Damos un ancho y alto fijos al contenedor del mapa para la imagen */}
        <div style={{ width: '952px', height: '480px', margin: '0 auto 20px auto', border: '1px solid #D1D5DB', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <MapContainer
                center={initialCenter}
                zoom={initialZoomForImage}
                style={{ width: '100%', height: '100%' }}
                className="leaflet-container-for-image" // Puedes usar esta clase para anular estilos de Leaflet si es necesario solo para la imagen
                zoomControl={false} 
                attributionControl={false}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                // Estas opciones pueden ayudar a que el mapa se renderice mejor para la captura
                preferCanvas={true} // Intenta renderizar en canvas si es posible
            >
                {/* NO HAY TILELAYER AQUÍ, solo el GeoJSON sobre el bg-background */}
                <GeoJSON
                    data={countriesData.features}
                    style={styleFeatureForImage}
                    // No necesitamos onEachFeature porque no es interactivo
                />
            </MapContainer>
        </div>

        {/* Lista de Países Visitados (solo si hay países seleccionados) */}
        {sortedSelectedCountries.length > 0 && (
            <div className="mt-4">
                <h3 
                    className="font-display text-lg font-bold text-primary mb-2"
                >
                    Countries You Have Visited:
                </h3>
                <p 
                    className="text-sm text-gray-700 leading-relaxed break-words px-4" // px-4 para que no llegue a los bordes
                    style={{ columnCount: 3, columnGap: '20px', textAlign: 'left' }} // Lista en columnas
                >
                    {sortedSelectedCountries.map(country => (
                        <span key={country} style={{ display: 'block', marginBottom: '4px' }}>{country}</span>
                    ))}
                </p>
            </div>
        )}
    </div>
  );
});

export default MapImageGenerator;
