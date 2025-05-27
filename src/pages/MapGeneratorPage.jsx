import React, { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas'; // Seguimos con html2canvas por ahora

// Components
import MapComponent from "../components/MapComponent";
import CountrySelector from "../components/CountrySelector";
import StatsCard from "../components/StatsCard"; // Aunque no lo usemos directamente en tempContainer, lo necesitamos para los datos
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

  // Necesitamos una ref para el MapComponent en la página, para poder clonarlo
  const mapDisplayRef = useRef(null); 
  const [isDownloading, setIsDownloading] = useState(false);
  const mapInstanceForDownloadRef = useRef(null);


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

  const handleMapReadyForDownload = (mapInstance) => {
    mapInstanceForDownloadRef.current = mapInstance;
  };
  
  const handleDownload = () => {
    // Usaremos el div que contiene el MapComponent visible en la página para clonarlo.
    const mapElementToClone = mapDisplayRef.current?.querySelector('.leaflet-container');

    if (!mapElementToClone) {
        console.error("Elemento del mapa para clonar no encontrado.");
        setIsDownloading(false);
        return;
    }
    setIsDownloading(true);

    // 1. Crear el contenedor temporal
    const tempContainer = document.createElement("div");
    // Aplicamos estilos directamente, pero usando clases de Tailwind sería mejor si el contexto lo permitiera
    // Para html2canvas, los estilos deben estar "inline" o ser muy simples si son externos.
    tempContainer.style.width = "1000px"; // Ancho fijo para la imagen
    tempContainer.style.padding = "20px";
    tempContainer.style.backgroundColor = "#F8F9FA"; // Nuestro bg-background
    tempContainer.style.fontFamily = "Arial, sans-serif"; // Fuente base
    tempContainer.style.textAlign = "center";
    // Para que html2canvas lo capture, debe estar en el DOM, pero puede estar oculto
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";

    // 2. Añadir título
    const title = document.createElement("h1");
    title.textContent = "My Travel Map";
    title.style.fontSize = "28px";
    title.style.fontWeight = "bold";
    title.style.color = "#0A3641"; // primary color
    title.style.marginBottom = "10px";
    tempContainer.appendChild(title);

    // 3. Añadir subtítulo de estadísticas
    const subtitle = document.createElement("p");
    subtitle.innerHTML = `${getVisitedCountriesCount()} countries visited - <b>${getVisitedPercentage()}%</b> of the world!`;
    subtitle.style.fontSize = "16px";
    subtitle.style.color = "#333";
    subtitle.style.marginBottom = "20px";
    tempContainer.appendChild(subtitle);

    // 4. Clonar el mapa y añadirlo
    // Clona el contenedor del mapa real que está en la página
    const mapCloneContainer = document.createElement("div");
    mapCloneContainer.style.width = "960px"; // Ancho del mapa dentro del tempContainer
    mapCloneContainer.style.height = "500px"; // Altura del mapa
    mapCloneContainer.style.margin = "0 auto 20px auto"; // Centrado y con margen inferior
    mapCloneContainer.style.border = "1px solid #ccc";
    mapCloneContainer.style.overflow = "hidden"; // Importante para el clon del mapa
    
    // Aquí está el truco: necesitamos que el mapa clonado se renderice
    // Si usamos mapElementToClone.cloneNode(true), los tiles de Leaflet no se copiarán.
    // En su lugar, crearemos un NUEVO MapComponent dentro del tempContainer
    // y le pasaremos los mismos props. Esto es más complejo.
    
    // Enfoque más simple: Clonar el HTML y esperar que html2canvas lo interprete
    // Esto puede no funcionar bien para los tiles de Leaflet.
    const mapVisualClone = mapElementToClone.cloneNode(true);
    // Intentar quitar controles del clon si es posible (esto es difícil en un clon estático)
    const zoomControlsInClone = mapVisualClone.querySelector(".leaflet-control-zoom");
    if (zoomControlsInClone) zoomControlsInClone.style.display = "none";
    const attributionInClone = mapVisualClone.querySelector(".leaflet-control-attribution");
    if (attributionInClone) attributionInClone.style.display = "none";

    mapCloneContainer.appendChild(mapVisualClone);
    tempContainer.appendChild(mapCloneContainer);

    // 5. Añadir lista de países visitados
    const visitedCountriesTitle = document.createElement("h3");
    visitedCountriesTitle.textContent = "Countries You Have Visited:";
    visitedCountriesTitle.style.fontSize = "18px";
    visitedCountriesTitle.style.fontWeight = "bold";
    visitedCountriesTitle.style.color = "#0A3641";
    visitedCountriesTitle.style.marginTop = "20px";
    visitedCountriesTitle.style.marginBottom = "10px";
    tempContainer.appendChild(visitedCountriesTitle);

    const visitedCountriesList = document.createElement("p");
    visitedCountriesList.textContent = selectedCountries.sort().join(", ");
    visitedCountriesList.style.fontSize = "14px";
    visitedCountriesList.style.color = "#555";
    visitedCountriesList.style.lineHeight = "1.6";
    visitedCountriesList.style.wordBreak = "break-word";
    tempContainer.appendChild(visitedCountriesList);

    document.body.appendChild(tempContainer);

    // Pequeño retraso para asegurar que el tempContainer se ha renderizado en el DOM oculto
    setTimeout(() => {
        html2canvas(tempContainer, {
            useCORS: true,
            allowTaint: true,
            scale: 1.5, // Escala un poco menor, 1000px de ancho ya es bastante
            logging: process.env.NODE_ENV === 'development',
            // Las dimensiones las tomará del estilo del tempContainer
            windowWidth: tempContainer.scrollWidth,
            windowHeight: tempContainer.scrollHeight,
            x:0, y:0, scrollX:0, scrollY:0, // Asegurar que captura desde el inicio
            removeContainer: true, // Limpia el clon del DOM que usa html2canvas
        }).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL('image/png', 0.95);
            link.download = "my-travel-map.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error generating image with html2canvas:", error);
        }).finally(() => {
            setIsDownloading(false);
            document.body.removeChild(tempContainer); // MUY IMPORTANTE: Limpiar el div temporal
        });
    }, 500); // Un delay para el renderizado del tempContainer
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Este es el mapa que se muestra en la página */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 w-full" ref={mapDisplayRef}> {/* <--- Ref para el contenedor del mapa visible */}
          <div className="shadow-xl rounded-lg overflow-hidden">
            <MapComponent 
              selectedCountries={selectedCountries} 
              onCountrySelect={handleCountrySelect}
              onMapReady={handleMapReadyForDownload} // Si necesitas la instancia para invalidateSize
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
             {/* ... OR separator and ShareButtons ... */}
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