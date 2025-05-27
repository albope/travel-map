import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink, FaCheck } from 'react-icons/fa';

const ShareButtons = ({ countriesVisited, worldPercentage }) => {
  const [copied, setCopied] = useState(false);

  // Si no se han visitado países, no se puede compartir nada.
  if (countriesVisited === 0) {
    return (
      <div className="text-center p-4 border-t border-gray-200 mt-4">
        <p className="text-sm text-gray-500">
          Select at least one country to enable sharing options.
        </p>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `I have visited ${countriesVisited} countries (${worldPercentage}% of the world)! Check out my travel map.`;

  const handleCopy = () => {
    setCopied(true);
    // Hacemos que el mensaje "Copied!" desaparezca después de 2 segundos.
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Plantilla para los botones para no repetir clases de Tailwind
  const buttonClass = "flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-white rounded-md transition-colors duration-200";

  return (
    <div className="w-full">
      <p className="text-sm text-center text-gray-500 mb-4">
        Share your travel stats with your friends:
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Botón de Facebook */}
        <FacebookShareButton
          url={shareUrl}
          quote={shareText}
          className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}
        >
          <FaFacebookF />
          <span>Facebook</span>
        </FacebookShareButton>

        {/* Botón de Twitter */}
        <TwitterShareButton
          url={shareUrl}
          title={shareText}
          className={`${buttonClass} bg-sky-500 hover:bg-sky-600`}
        >
          <FaTwitter />
          <span>Twitter</span>
        </TwitterShareButton>

        {/* Botón de WhatsApp */}
        <WhatsappShareButton
          url={shareUrl}
          title={shareText}
          separator=" :: "
          className={`${buttonClass} bg-green-500 hover:bg-green-600`}
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </WhatsappShareButton>

        {/* NUEVO: Botón para Copiar Enlace */}
        <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
          <button className={`${buttonClass} ${copied ? 'bg-teal-600' : 'bg-gray-600 hover:bg-gray-700'}`}>
            {copied ? <FaCheck /> : <FaLink />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareButtons;