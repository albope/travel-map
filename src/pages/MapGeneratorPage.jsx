import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import { FaCloudDownloadAlt, FaShareAlt, FaMapMarkedAlt } from "react-icons/fa";

// Components
import MapComponent from "../components/MapComponent";
import CountrySelector from "../components/CountrySelector";
import StatsCard from "../components/StatsCard";
import ShareButtons from '../components/ShareButtons';
import MapImageGenerator from "../components/MapImageGenerator";

// Data
import { continentMapping } from "../data/continentMapping";

const TOTAL_COUNTRIES = 195;

const MapGeneratorPage = () => {
  // --- Estado y Lógica (Mantenemos tu lógica intacta) ---
  const [selectedCountries, setSelectedCountries] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedCountries");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse selected countries", error);
      return [];
    }
  });

  const imageGeneratorRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
      setSelectedCountries(prev => {
        const isSelected = prev.includes(countryName);
        return isSelected ? prev.filter(c => c !== countryName) : [...prev, countryName];
      });
    } else {
      setSelectedCountries(countryNameOrNewArray);
    }
  };
  
  const handleDownload = () => {
    if (!imageGeneratorRef.current) return;
    
    setIsDownloading(true);
    const elementToCapture = imageGeneratorRef.current;

    setTimeout(() => {
      html2canvas(elementToCapture, {
        scale: 2, // Mejor calidad (Retina)
        logging: false,
        useCORS: true,
        backgroundColor: null,
        width: elementToCapture.offsetWidth,
        height: elementToCapture.offsetHeight,
        windowWidth: elementToCapture.scrollWidth,
        windowHeight: elementToCapture.scrollHeight,
        removeContainer: true,
      }).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL('image/png', 1.0);
        link.download = `travel-map-${new Date().toISOString().slice(0,10)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => console.error("Error generating image:", err))
      .finally(() => setIsDownloading(false));
    }, 500);
  };

  // --- Renderizado (El Nuevo Diseño) ---
  return (
    <div className="animate-fade-in pb-12">
      
      {/* 1. Generador Oculto (Off-screen) */}
      <div className="fixed left-[-9999px] top-[-9999px]">
        <MapImageGenerator 
          ref={imageGeneratorRef} 
          selectedCountries={selectedCountries}
          visitedCountriesCount={getVisitedCountriesCount()} 
          visitedPercentage={getVisitedPercentage()}
        />
      </div>

      {/* 2. Header de Página */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Tu Mapa de Viajes
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl text-lg">
            Selecciona los países que has visitado y genera tu imagen personalizada.
          </p>
        </div>
        
        {/* Estadísticas Rápidas (Badge) */}
        <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary">{getVisitedCountriesCount()}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Países</span>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-primary">{getVisitedPercentage()}%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mundo</span>
          </div>
        </div>
      </div>

      {/* 3. Grid Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Mapa (Ocupa 8 de 12 columnas) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-slate-100 relative group">
            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-slate-500 pointer-events-none">
              Interactivo
            </div>
            <MapComponent 
              selectedCountries={selectedCountries} 
              onCountrySelect={handleCountrySelect}
            />
          </div>

          {/* Banner de instrucciones pequeño */}
          <div className="bg-primary-light/30 border border-primary-light text-primary-hover px-4 py-3 rounded-xl flex items-start gap-3 text-sm">
            <FaMapMarkedAlt className="mt-1 text-lg shrink-0" />
            <p>
              <strong>Tip:</strong> Puedes hacer clic directamente en el mapa para marcar o desmarcar países. Usa el buscador de la derecha para encontrar islas pequeñas.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: Sidebar de Control (Ocupa 4 de 12 columnas) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          
          {/* Panel de Selección */}
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
            <h2 className="font-display text-xl font-bold text-slate-800 mb-4">
              Añadir Destinos
            </h2>
            <CountrySelector
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
            />
            
            {/* Aquí podríamos poner la StatsCard simplificada o detallada */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <StatsCard
                continents={getVisitedContinents()}
                countries={getVisitedCountriesCount()}
                percentage={getVisitedPercentage()}
                visitedCountries={selectedCountries}
              />
            </div>
          </div>

          {/* Panel de Acciones */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-float p-6 text-white overflow-hidden relative">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-2xl"></div>
            
            <h3 className="font-display text-lg font-bold mb-4 relative z-10">Exportar Mapa</h3>
            
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-white text-slate-900 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 mb-4 shadow-lg relative z-10"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <FaCloudDownloadAlt className="text-xl" />
                  <span>Descargar Imagen</span>
                </>
              )}
            </button>

            <div className="relative z-10">
               <p className="text-slate-400 text-sm mb-3 text-center">O compártelo en redes:</p>
               <div className="flex justify-center">
                 <ShareButtons
                   countriesVisited={getVisitedCountriesCount()}
                   worldPercentage={getVisitedPercentage()}
                   darkMode={true} // Pasamos prop para que los botones se adapten al fondo oscuro
                 />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapGeneratorPage;