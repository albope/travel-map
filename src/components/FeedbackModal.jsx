import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FaTimes, FaSpinner, FaCheckCircle, FaRegpaperPlane } from 'react-icons/fa';

const FeedbackModal = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  const sendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackType || !message) {
      // Usamos un borde rojo temporal o animación en lugar de alert() nativo si es posible,
      // pero por simplicidad mantenemos la lógica, mejorando la UX visualmente.
      return;
    }
    setSubmitting(true);

    // Mantenemos tus credenciales originales
    emailjs.sendForm('service_kyne94a', 'template_grhhbhk', e.target, 'Dogg3WCEJxrSVXRT8')
      .then(() => {
        setSucceeded(true);
      }, (error) => {
        console.error('Failed to send feedback:', error);
      }).finally(() => {
        setSubmitting(false);
      });
  };
  
  const EmojiButton = ({ emoji, label, type, selectedType, onClick }) => {
    const isSelected = selectedType === type;
    return (
      <button
        type="button"
        onClick={() => onClick(type)}
        className={`
          flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 group
          ${isSelected 
            ? 'bg-primary/10 scale-110 ring-2 ring-primary ring-offset-2' 
            : 'hover:bg-slate-50 hover:scale-105'
          }
        `}
      >
        <span className={`text-4xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'grayscale-[0.5] group-hover:grayscale-0'}`}>
          {emoji}
        </span>
        <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
      {/* Backdrop con Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Card */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in border border-slate-100">
        
        {/* Header decorativo */}
        <div className="h-2 w-full bg-gradient-to-r from-primary to-emerald-400"></div>

        <div className="p-8">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <FaTimes size={18} />
          </button>
          
          {succeeded ? (
            // --- Success State ---
            <div className="text-center py-10 flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <FaCheckCircle className="text-3xl" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">¡Gracias por tu opinión!</h2>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Tus comentarios nos ayudan a mejorar Travel Map cada día.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Cerrar
              </button>
            </div>
          ) : (
            // --- Form State ---
            <>
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">Danos Feedback</h2>
                <p className="text-slate-500">¿Qué te parece la experiencia hasta ahora?</p>
              </div>

              <form onSubmit={sendFeedback} className="space-y-6">
                
                {/* Selección de Emojis */}
                <div className="flex justify-center gap-4 sm:gap-8">
                  <EmojiButton emoji="😞" label="Mal" type="Bad" selectedType={feedbackType} onClick={setFeedbackType} />
                  <EmojiButton emoji="😐" label="Normal" type="Neutral" selectedType={feedbackType} onClick={setFeedbackType} />
                  <EmojiButton emoji="🤩" label="Genial" type="Good" selectedType={feedbackType} onClick={setFeedbackType} />
                </div>
                <input type="hidden" name="feedbackType" value={feedbackType} />
                
                {/* Textarea */}
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Cuéntanos más detalles..."
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting || !feedbackType}
                  className={`
                    w-full py-3.5 px-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg
                    ${submitting || !feedbackType 
                      ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                      : 'bg-primary hover:bg-primary-hover hover:shadow-primary/30 active:scale-[0.98]'
                    }
                  `}
                >
                  {submitting ? (
                    <> <FaSpinner className="animate-spin" /> Enviando... </>
                  ) : (
                    <> Enviar Comentarios <FaRegpaperPlane size={14} /> </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;