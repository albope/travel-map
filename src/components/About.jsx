import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from 'react-icons/fa';

// Componente FAQ Atomico
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex justify-between items-center text-left py-5 px-2 group focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-slate-700 group-hover:text-primary'}`}>
          {question}
        </span>
        <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          <FaChevronDown />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div className="text-slate-600 leading-relaxed px-2 text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="animate-fade-in">
      
      {/* --- Hero Section --- */}
      <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          Project Showcase
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Sobre este Proyecto
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Travel Map Generator es un proyecto personal diseñado para visualizar tus aventuras y compartirlas con el mundo. Simple, rápido y bonito.
        </p>
      </div>

      {/* --- FAQ Section --- */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            Preguntas Frecuentes
          </h2>
          <div className="flex flex-col">
            <FaqItem question="¿Cuál es el propósito del proyecto?">
              <p>Ayudarte a visualizar gráficamente los países que has visitado. Puedes seleccionar destinos, ver estadísticas en tiempo real y descargar una imagen de alta calidad para tus redes sociales.</p>
            </FaqItem>
            <FaqItem question="¿Cómo uso el generador?">
              <p>Simplemente haz clic en el mapa interactivo o usa el buscador inteligente para añadir países. El mapa se actualiza instantáneamente.</p>
            </FaqItem>
            <FaqItem question="¿Puedo descargar mi mapa?">
              <p>¡Sí! Una vez tengas tu selección, usa el panel lateral para descargar un PNG de alta resolución listo para Instagram, Twitter o WhatsApp.</p>
            </FaqItem>
            <FaqItem question="¿Por qué hay 195 países?">
              <p>Nos basamos en la lista de estados miembros y observadores reconocidos por las Naciones Unidas (193 + 2).</p>
            </FaqItem>
          </div>
        </div>
      </div>

      {/* --- Contact Section --- */}
      <div className="bg-slate-900 rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden text-white shadow-2xl">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-bold mb-4">Contacta Conmigo</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            ¿Tienes alguna sugerencia o encontraste un bug? Me encantaría escucharte.
          </p>
          
          <div className="flex justify-center items-center gap-6">
            <a href="https://github.com/albope/travel-map" target="_blank" rel="noopener noreferrer" 
               className="bg-white/10 p-4 rounded-2xl hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm group">
              <FaGithub size={28} />
            </a>
            <a href="https://www.linkedin.com/in/albertobort" target="_blank" rel="noopener noreferrer" 
               className="bg-white/10 p-4 rounded-2xl hover:bg-[#0077b5] hover:text-white transition-all duration-300 backdrop-blur-sm">
              <FaLinkedin size={28} />
            </a>
            <a href="mailto:albertobort@gmail.com" 
               className="bg-white/10 p-4 rounded-2xl hover:bg-accent hover:text-white transition-all duration-300 backdrop-blur-sm">
              <FaEnvelope size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;