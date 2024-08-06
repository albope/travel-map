// src/components/About.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="about-container">
      <h2>About this Project</h2>
      <p>
        Welcome to the Travel-Map Generator, a project created to help you visualize and share your travel adventures with friends and family.
      </p>
      <p>
        This project is a result of my passion for development and travel, created during my spare time.
      </p>
      <div className="links">
        <a href="https://github.com/albope/travel-map" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} /> <span className="link-text">GitHub Repository</span>
        </a>
        <a href="https://linkedin.com/in/alberto-bort" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} /> <span className="link-text">LinkedIn Profile</span>
        </a>
      </div>
      <div className="contact">
        <p><FontAwesomeIcon icon={faEnvelope} /> Contact me:</p>
        <p>Email: <a href="mailto:albertobort@gmail.com" className="email-link">albertobort@gmail.com</a></p>
      </div>
      <p>
        Stay connected with me for updates and new features!
      </p>
    </div>
  );
};

export default About;