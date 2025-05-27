import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Mejora: Cierra el menú cuando el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  
  // Mejora: Cierra el menú cuando cambia la ruta (el usuario navega a otra página)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    // Usamos ref para detectar clics fuera del menú
    <div className="relative" ref={menuRef}>
      <button
        className="relative z-20 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {/* Usamos react-icons para consistencia */}
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Menú desplegable con transiciones */}
      <div
        className={`
          absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <div className="py-1">
          <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary">Map Generator</Link>
          <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary">About</Link>
          <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary">Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;