import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';

// Components
import MapComponent from "../components/MapComponent";
import CountrySelector from "../components/CountrySelector";
import StatsCard from "../components/StatsCard";
import ShareButtons from '../components/ShareButtons';

// Data
import { continentMapping } from "../data/continentMapping";

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

  const printableAreaRef = useRef(null);
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

  // CORREGIDO: handleCountrySelect maneja la lógica de añadir/quitar si recibe un string (nombre de país)
  // o establece el array directamente si recibe un array (del CountrySelector).
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
    if (!printableAreaRef.current) return;
    setIsDownloading(true);

    html2canvas(printableAreaRef.current, {
        useCORS: true,
        backgroundColor: '#F8F9FA', 
        scale: 2, 
        ignoreElements: (element) => false 
    }).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL('image/png');
        link.download = "my-travel-map.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div ref={printableAreaRef} className="bg-background p-6 rounded-lg"> 
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl font-bold text-primary">
            My Travel Map
          </h1>
          <p className="text-md text-gray-600">
            {selectedCountries.length} countries visited - {getVisitedPercentage()}% of the world!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-3/4 w-full">
            <div className="shadow-xl rounded-lg overflow-hidden">
              <MapComponent 
                selectedCountries={selectedCountries} 
                onCountrySelect={handleCountrySelect} 
              />
            </div>
          </div>
          <div className="md:w-1/4 w-full">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <StatsCard
                continents={getVisitedContinents()}
                countries={getVisitedCountriesCount()}
                percentage={getVisitedPercentage()}
                visitedCountries={selectedCountries}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-2xl font-bold text-text-main text-center mb-6">
          Customize Your Map
        </h2>
        <div className="lg:w-1/2 mx-auto flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <CountrySelector
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4">
             <h3 className="font-display text-xl font-bold text-center">Export & Share</h3>
             <button 
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400"
                onClick={handleDownload}
                disabled={isDownloading}
              >
               {isDownloading ? 'Generating...' : 'Download Map as PNG'}
             </button>
             <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500">OR</span>
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