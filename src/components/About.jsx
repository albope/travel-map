// src/components/About.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Correcto: faGithub y faLinkedin están en 'free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Correcto: faEnvelope está en 'free-solid-svg-icons'

const About = () => {
  // Estado para manejar el toggle de las preguntas frecuentes
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFAQ = (index) => {
    setFaqOpen(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  return (
    <div className="about-container">
      <h2>About this Project</h2>
      <p>
        Welcome to the Travel-Map Generator, a project created to help you visualize and share your travel adventures with friends and family.
      </p>
      <p>
        This project is a result of my passion for development and travel, created during my spare time.
      </p>

      {/* Sección de FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(1)}>What is the purpose of this project?</h3>
          <p className={faqOpen[1] ? 'open' : 'closed'}>
            This project helps you visualize and share your travel adventures with friends and family.
          </p>
        </div>
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(2)}>How can I use the travel map generator?</h3>
          <p className={faqOpen[2] ? 'open' : 'closed'}>
            Simply select the countries you have visited, and the map will update automatically.
          </p>
        </div>
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(3)}>Can I download the map?</h3>
          <p className={faqOpen[3] ? 'open' : 'closed'}>
            Yes, you can download the map in PNG format using the download button provided.
          </p>
        </div>
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(4)}>Why are there 195 countries on the map?</h3>
          <p className={faqOpen[4] ? 'open' : 'closed'}>
            The total of 195 countries is based on the list recognized by the United Nations, which includes 193 member states and 2 observer states.
          </p>
        </div>
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(5)}>Can I reset the map after selecting countries?</h3>
          <p className={faqOpen[5] ? 'open' : 'closed'}>
            Yes, you can clear your selections and start over using the reset button.
          </p>
        </div>
      </section>

      {/* Sección de contacto resaltada */}
      <section className="contact-section">
        <h2>Contact Me</h2>
        <div className="contact-box">
          <p>Email: <a href="mailto:albertobort@gmail.com" className="email-link">albertobort@gmail.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/albertobort" target="_blank" rel="noopener noreferrer">linkedin.com/in/albertobort</a></p>
          <p>GitHub: <a href="https://github.com/albope/travel-map" target="_blank" rel="noopener noreferrer" className="email-link">
            github.com/albope/travel-map
          </a></p>
        </div>
      </section>

      <p>
        Stay connected with me for updates and new features!
      </p>
    </div>
  );
};

export default About;