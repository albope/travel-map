import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components & Pages
import HamburgerMenu from "./components/HamburgerMenu";
import FeedbackModal from "./components/FeedbackModal";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import MapGeneratorPage from "./pages/MapGeneratorPage"; // Importamos la nueva página

// Icono para el logo
import { FaGlobeAmericas } from "react-icons/fa";


const App = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const feedbackButtonRef = useRef(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* --- Header --- */}
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 text-xl font-display font-bold hover:text-gray-300 transition-colors">
              <FaGlobeAmericas className="text-accent" />
              <span>Travel Map</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                ref={feedbackButtonRef}
                onClick={() => setShowFeedbackModal(true)}
                className="hidden md:block bg-transparent border-2 border-white text-white font-semibold py-1 px-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
              >
                Feedback
              </button>
              <HamburgerMenu />
            </div>
          </nav>
        </header>

        {/* --- Contenido Principal y Rutas --- */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MapGeneratorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>

        {/* --- Footer --- */}
        <footer className="bg-gray-200 text-center py-4">
          <p className="text-gray-600">
            Made with <span className="text-red-500">❤</span> by Alberto Bort
          </p>
        </footer>

        {/* --- Modal de Feedback --- */}
        {showFeedbackModal && (
          <FeedbackModal onClose={() => setShowFeedbackModal(false)} triggerRef={feedbackButtonRef} />
        )}
      </div>
    </Router>
  );
};

export default App;