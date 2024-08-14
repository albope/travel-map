// src/components/HamburgerMenu.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css'; // Asegúrate de tener este archivo de estilos

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
      </button>
      {isOpen && (
        <div className="menu-links">
          <Link to="/" onClick={toggleMenu}>Map Generator</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link> {/* Enlace añadido al blog */}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;