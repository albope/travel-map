import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const FeedbackModal = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const sendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackType || !message) {
      alert('Please select a feedback type and write a message.');
      return;
    }
    setSubmitting(true);

    emailjs.sendForm('service_kyne94a', 'template_grhhbhk', e.target, 'Dogg3WCEJxrSVXRT8')
      .then(() => {
        setSucceeded(true);
      }, (error) => {
        console.error('Failed to send feedback:', error);
        alert('Sorry, there was an error sending your feedback. Please try again later.');
      }).finally(() => {
        setSubmitting(false);
      });
  };
  
  const EmojiButton = ({ emoji, type, selectedType, onClick }) => {
    const isSelected = selectedType === type;
    return (
        <button
          type="button"
          onClick={() => onClick(type)}
          className={`text-4xl p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-125 ${isSelected ? 'scale-125 ring-2 ring-accent' : 'scale-100'}`}
        >
          {emoji}
        </button>
    );
  };

  return (
    // Overlay con transición de fade-in y z-index corregido
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] transition-opacity duration-300 animate-fade-in">
      
      {/* Contenedor del modal con animación de scale-in */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-all duration-300 animate-scale-in">
        
        {/* Botón de cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
            <FaTimes size={20} />
        </button>
        
        {succeeded ? (
          // Vista de éxito
          <div className="text-center py-8">
            <FaCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
            <h2 className="font-display text-2xl font-bold text-primary mb-2">Thank you!</h2>
            <p className="text-gray-600 mb-6">Your feedback has been sent successfully.</p>
            <button
                onClick={onClose}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // Vista del formulario
          <>
            <h2 className="font-display text-2xl font-bold text-primary text-center mb-6">Leave Feedback</h2>
            <form onSubmit={sendFeedback}>
              
              <div className="flex justify-around items-center mb-6">
                <EmojiButton emoji="😞" type="Bad" selectedType={feedbackType} onClick={setFeedbackType} />
                <EmojiButton emoji="😐" type="Neutral" selectedType={feedbackType} onClick={setFeedbackType} />
                <EmojiButton emoji="😊" type="Good" selectedType={feedbackType} onClick={setFeedbackType} />
              </div>

              <input type="hidden" name="feedbackType" value={feedbackType} />
              
              <textarea
                name="message"
                placeholder="Please provide your feedback here..."
                required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-shadow"
              ></textarea>
              
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-gray-400"
              >
                {submitting && <FaSpinner className="animate-spin" />}
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;