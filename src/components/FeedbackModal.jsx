import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const FeedbackModal = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const sendFeedback = (e) => {
    e.preventDefault();
    setSubmitting(true);

    emailjs.sendForm('service_kyne94a', 'template_grhhbhk', e.target, 'Dogg3WCEJxrSVXRT8')
      .then(() => {
        setSucceeded(true);
        setSubmitting(false);
      }, (error) => {
        console.error('Failed to send feedback:', error);
        setSubmitting(false);
      });
  };

  if (succeeded) {
    return (
      <div className="feedback-modal-overlay">
        <div className="feedback-modal">
          <h2>Thank you for your feedback!</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Leave feedback</h2>
        <form onSubmit={sendFeedback}>
          <div className="feedback-type">
            <button
              type="button"
              onClick={() => setFeedbackType('Bad')}
              className={feedbackType === 'Bad' ? 'selected' : ''}
            >😞</button>
            <button
              type="button"
              onClick={() => setFeedbackType('Neutral')}
              className={feedbackType === 'Neutral' ? 'selected' : ''}
            >😐</button>
            <button
              type="button"
              onClick={() => setFeedbackType('Good')}
              className={feedbackType === 'Good' ? 'selected' : ''}
            >😊</button>
          </div>
          <input type="hidden" name="feedbackType" value={feedbackType} />
          <textarea
            name="message"
            placeholder="Please provide your feedback here..."
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;