import React, { useState } from 'react';

const FeedbackModal = ({ onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Crear el asunto y el cuerpo del correo electrónico
    const subject = encodeURIComponent('User Feedback');
    const body = encodeURIComponent(`Feedback Type: ${feedbackType}\n\nFeedback: ${feedbackText}`);

    // Redirigir al cliente de correo predeterminado con el asunto y cuerpo prellenado
    window.location.href = `mailto:albertobort@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Leave feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="feedback-type">
            <button type="button" onClick={() => setFeedbackType('Bad')} className={feedbackType === 'Bad' ? 'selected' : ''}>😞</button>
            <button type="button" onClick={() => setFeedbackType('Neutral')} className={feedbackType === 'Neutral' ? 'selected' : ''}>😐</button>
            <button type="button" onClick={() => setFeedbackType('Good')} className={feedbackType === 'Good' ? 'selected' : ''}>😊</button>
          </div>
          <textarea
            placeholder="What if..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;