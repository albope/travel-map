import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink, FaCheck } from 'react-icons/fa';

const ShareButtons = ({ countriesVisited, worldPercentage, darkMode = false }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = `¡He visitado ${countriesVisited} países (${worldPercentage}% del mundo)! Crea tu propio mapa de viajes aquí.`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clases base dinámicas: Aplicamos los estilos directamente al botón interactivo
  const baseButtonClass = `
    flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 transform hover:-translate-y-0.5 w-full cursor-pointer
    ${darkMode 
      ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10' 
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
    }
  `;

  if (countriesVisited === 0) {
    return (
      <p className={`text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} italic`}>
        Selecciona países para compartir.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-3">
        {/* Twitter / X */}
        {/* Nota: Aplicamos la clase directamente al componente para evitar nesting innecesario (div dentro de button) */}
        <TwitterShareButton 
          url={shareUrl} 
          title={shareText} 
          className={`${baseButtonClass} hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]`}
          resetButtonStyle={false} // Importante: Permite que nuestros estilos sobrescriban los default
        >
          <FaTwitter className="text-lg" />
          <span>Tweet</span>
        </TwitterShareButton>

        {/* WhatsApp */}
        <WhatsappShareButton 
          url={shareUrl} 
          title={shareText} 
          separator=" :: " 
          className={`${baseButtonClass} hover:bg-[#25D366] hover:text-white hover:border-[#25D366]`}
          resetButtonStyle={false}
        >
          <FaWhatsapp className="text-lg" />
          <span>WhatsApp</span>
        </WhatsappShareButton>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Facebook */}
        <FacebookShareButton 
          url={shareUrl} 
          quote={shareText} 
          className={`${baseButtonClass} hover:bg-[#4267B2] hover:text-white hover:border-[#4267B2]`}
          resetButtonStyle={false}
        >
          <FaFacebookF className="text-lg" />
          <span>Post</span>
        </FacebookShareButton>

        {/* Copy Link */}
        <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
          <button 
            type="button"
            className={`${baseButtonClass} ${copied ? '!bg-teal-500 !text-white !border-teal-500' : ''}`}
          >
            {copied ? <FaCheck className="text-lg" /> : <FaLink className="text-lg" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareButtons;