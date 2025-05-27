import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-text-main focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};


const About = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* --- Sección de Introducción --- */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">About This Project</h1>
          <p className="text-lg text-gray-600 mb-12">
            Welcome to the Travel-Map Generator, a passion project designed to help you visualize and share your travel adventures with friends and family.
          </p>
        </div>

        {/* --- Sección de FAQ --- */}
        <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-text-main mb-6 text-center">Frequently Asked Questions</h2>
            <FaqItem question="What is the purpose of this project?">
                <p>This project helps you visualize your travel adventures. You can select the countries you have visited, generate a customized map, view statistics, and share your journey.</p>
            </FaqItem>
            <FaqItem question="How can I use the travel map generator?">
                <p>Simply use the interactive list or click on the map to select the countries you have visited. The map and your stats will update automatically.</p>
            </FaqItem>
            <FaqItem question="Can I download or share the map?">
                 <p>Yes, on the main page, you'll find options to download your personalized map as a PNG file or share a link to your travels on social media.</p>
            </FaqItem>
             <FaqItem question="Why are there 195 countries on the map?">
                <p>The total of 195 countries is based on the list recognized by the United Nations, which includes 193 member states and 2 observer states.</p>
            </FaqItem>
        </div>

        {/* --- Sección de Contacto --- */}
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-text-main mb-6">Contact Me</h2>
            <p className="text-lg text-gray-600 mb-8">
                Have questions, suggestions, or just want to connect? Feel free to reach out!
            </p>
            <div className="flex justify-center items-center gap-6">
                <a href="https://github.com/albope/travel-map" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-300">
                    <FaGithub size={32} />
                </a>
                <a href="https://www.linkedin.com/in/albertobort" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-300">
                    <FaLinkedin size={32} />
                </a>
                <a href="mailto:albertobort@gmail.com" className="text-gray-500 hover:text-primary transition-colors duration-300">
                    <FaEnvelope size={32} />
                </a>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;