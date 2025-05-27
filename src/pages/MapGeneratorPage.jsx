import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';

// Components
import MapComponent from "../components/MapComponent"; // El mapa interactivo visible
import CountrySelector from "../components/CountrySelector";
import StatsCard from "../components/StatsCard";
import ShareButtons from '../components/ShareButtons';
import MapImageGenerator from "../components/MapImageGenerator"; // Importamos el componente para la imagen

// Data
import { continentMapping } from "../data/continentMapping"; // Asegúrate que la ruta es correcta

const TOTAL_COUNTRIES = 195;

const MapGeneratorPage = () => {
  const [selectedCountries, setSelectedCountries] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCountries");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse selected countries from localStorage", error);
      return [];
    }
  });

  const imageGeneratorRef = useRef(null); // Ref para el MapImageGenerator
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Ya no necesitamos mapInstanceRef ni handleMapReady para la descarga con este enfoque
  // ya que MapImageGenerator es autónomo.

  useEffect(() => {
    localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));
  }, [selectedCountries]);

  const getVisitedContinents = () => {
    const visitedContinents = new Set(
      selectedCountries.map(country => continentMapping[country]).filter(Boolean)
    );
    return visitedContinents.size;
  };

  const getVisitedCountriesCount = () => selectedCountries.length;

  const getVisitedPercentage = () => {
    if (TOTAL_COUNTRIES === 0) return "0.00";
    return ((selectedCountries.length / TOTAL_COUNTRIES) * 100).toFixed(2);
  };

  const handleCountrySelect = (countryNameOrNewArray) => {
    if (typeof countryNameOrNewArray === 'string') {
      const countryName = countryNameOrNewArray;
      setSelectedCountries(prevSelectedCountries => {
        const isSelected = prevSelectedCountries.includes(countryName);
        if (isSelected) {
          return prevSelectedCountries.filter(c => c !== countryName);
        } else {
          return [...prevSelectedCountries, countryName];
        }
      });
    } else {
      setSelectedCountries(countryNameOrNewArray);
    }
  };
  
  const handleDownload = () => {
    if (!imageGeneratorRef.current) {
      console.error("Image generator ref is not available.");
      setIsDownloading(false);
      return;
    }
    
    setIsDownloading(true);
    const elementToCapture = imageGeneratorRef.current;

    // Pequeño delay para asegurar que el MapImageGenerator (oculto) se ha renderizado completamente
    // y que las fuentes (si son webfonts) han tenido tiempo de cargar.
    setTimeout(() => {
      html2canvas(elementToCapture, {
        scale: 1.5, // Puedes ajustar la escala. 1.5 para 1000px de ancho da una imagen de 1500px.
        logging: process.env.NODE_ENV === 'development', 
        useCORS: true, 
        backgroundColor: null, // Dejamos que el fondo del div principal de MapImageGenerator defina el color
        // Las dimensiones las tomará del estilo del MapImageGenerator
        width: elementToCapture.offsetWidth, 
        height: elementToCapture.offsetHeight,
        windowWidth: elementToCapture.scrollWidth,
        windowHeight: elementToCapture.scrollHeight,
        removeContainer: true, // Limpia el clon del DOM que usa html2canvas después de la captura
      }).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL('image/png', 0.95); // Calidad del PNG
        link.download = "my-travel-map.png"; // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error generating image with html2canvas:", error);
      })
      .finally(() => {
        setIsDownloading(false);
      });
    }, 700); // Delay para el renderizado del componente oculto
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* --- Componente para generar la imagen (oculto) --- */}
      {/* Se renderiza fuera de la pantalla para que html2canvas lo capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', zIndex: -1 }}>
        <MapImageGenerator 
          ref={imageGeneratorRef} 
          selectedCountries={selectedCountries}
          visitedCountriesCount={getVisitedCountriesCount()} 
          visitedPercentage={getVisitedPercentage()}
        />
      </div>

      {/* --- Título y descripción visibles en la página --- */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-main mb-2">
          Travel. Select. Generate.
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Create a personalized travel map showing the countries you've visited. Share your adventures with friends and plan your next destination!
        </p>
      </div>
      
      {/* --- Layout visible para el usuario --- */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 w-full">
          <div className="shadow-xl rounded-lg overflow-hidden">
            <MapComponent 
              selectedCountries={selectedCountries} 
              onCountrySelect={handleCountrySelect}
              // onMapReady ya no es necesario aquí para la descarga,
              // pero lo mantenemos si MapComponent o ResetZoomControl lo usan internamente.
              // Si no, se puede quitar de MapComponent también.
              // onMapReady={handleMapReady} 
            />
          </div>
        </div>
        <div className="lg:w-1/3 w-full flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <StatsCard
              continents={getVisitedContinents()}
              countries={getVisitedCountriesCount()}
              percentage={getVisitedPercentage()}
              visitedCountries={selectedCountries}
            />
          </div>
        </div>
      </div>

      {/* --- Controles de la Aplicación --- */}
      <div className="mt-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-main text-center mb-8">
          Customize Your Map & Share
        </h2>
        <div className="max-w-xl mx-auto flex flex-col gap-8">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <CountrySelector
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4">
             <h3 className="font-display text-xl font-bold text-center text-text-main">Export & Share</h3>
             <button 
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-400"
                onClick={handleDownload}
                disabled={isDownloading}
              >
               {isDownloading ? 'Generating...' : 'Download Map as PNG'}
             </button>
             <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
             </div>
             <ShareButtons
                countriesVisited={getVisitedCountriesCount()}
                worldPercentage={getVisitedPercentage()}
              />
          </div>
        </div>
      </div>
    </main>
  );
};
export default MapGeneratorPage;