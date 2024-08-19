// src/components/ShareButtons.jsx
import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const ShareButtons = ({ countriesVisited, worldPercentage }) => {
  const shareUrl = window.location.href; // Obtiene la URL actual de la página
  const shareText = `I have visited ${countriesVisited} countries, which accounts for ${worldPercentage}% of the world. Track and count all the countries you've visited with the interactive world map.`;

  return (
    <div className="share-buttons-container">
      <p>Share the personalized map of the countries you have visited:</p>
      <div className="share-buttons">
        <FacebookShareButton url={shareUrl} quote={shareText}>
          <FaFacebookF />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareText}>
          <FaTwitter />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={shareText}>
          <FaWhatsapp />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;