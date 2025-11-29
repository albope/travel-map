import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { FaGlobeAmericas, FaBars, FaTimes } from "react-icons/fa";

// Components & Pages
import FeedbackModal from "./components/FeedbackModal";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import MapGeneratorPage from "./pages/MapGeneratorPage";

// Componente NavLink personalizado
const NavLink = ({ to, children, mobile = false, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = mobile
    ? "block w-full py-3 px-4 text-lg rounded-xl transition-all duration-300"
    : "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";

  const activeClasses = isActive
    ? "bg-primary text-white shadow-md transform scale-105"
    : "text-text-secondary hover:text-primary hover:bg-primary-light/50";

  return (
    <Link to={to} onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {children}
    </Link>
  );
};

// Componente Wrapper para tener acceso a useLocation dentro del Router
const AppContent = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const feedbackButtonRef = useRef(null);
  
  // Hook para saber dónde estamos
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
        
      {/* --- Modern Navbar (Glassmorphism) --- */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-0">
        <nav className="container mx-auto max-w-5xl bg-surface/80 backdrop-blur-md border border-white/20 shadow-soft rounded-2xl px-6 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaGlobeAmericas className="text-primary text-xl group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg font-display font-bold text-text-main tracking-tight">
              Travel<span className="text-primary">Map</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1 rounded-full">
            <NavLink to="/">Crear Mapa</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">Nosotros</NavLink>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              ref={feedbackButtonRef}
              onClick={() => setShowFeedbackModal(true)}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              Feedback
            </button>
            
            {/* CORRECCIÓN: El botón "Empezar" solo aparece si NO estás en la home */}
            {!isHomePage && (
              <Link 
                to="/" 
                className="bg-text-main text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-black hover:shadow-xl transition-all transform hover:-translate-y-0.5 animate-fade-in"
              >
                Empezar
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-text-main p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-surface shadow-card rounded-2xl p-4 flex flex-col gap-2 border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-200">
            <NavLink to="/" mobile onClick={() => setIsMobileMenuOpen(false)}>Crear Mapa</NavLink>
            <NavLink to="/blog" mobile onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
            <NavLink to="/about" mobile onClick={() => setIsMobileMenuOpen(false)}>Nosotros</NavLink>
            <div className="h-px bg-slate-100 my-2"></div>
            <button
              onClick={() => {
                setShowFeedbackModal(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-3 px-4 text-lg text-text-secondary rounded-xl hover:bg-slate-50"
            >
              Dar Feedback
            </button>
          </div>
        )}
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow pt-28 pb-10 px-4">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <Routes>
            <Route path="/" element={<MapGeneratorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
      </main>

      {/* --- Clean Footer --- */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Travel Map. Hecho con <span className="text-accent animate-pulse">❤</span> por Alberto Bort.
          </p>
        </div>
      </footer>

      {/* --- Modals --- */}
      {showFeedbackModal && (
        <FeedbackModal onClose={() => setShowFeedbackModal(false)} triggerRef={feedbackButtonRef} />
      )}
    </div>
  );
};

// Componente Principal que provee el Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;