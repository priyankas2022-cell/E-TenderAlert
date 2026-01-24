import React from 'react';

const ContactIcons = ({ handleWhatsAppClick, handleTelegramClick, handleGmailClick }) => {
  return (
    <div className="contact-icons">
      <div className="contact-icon whatsapp-icon" onClick={handleWhatsAppClick}>
        <i className="fab fa-whatsapp"></i>
        <div className="contact-tooltip">Chat on WhatsApp</div>
      </div>
      <div className="contact-icon telegram-icon" onClick={handleTelegramClick}>
        <i className="fab fa-telegram"></i>
        <div className="contact-tooltip">Message on Telegram</div>
      </div>
      <div className="contact-icon gmail-icon" onClick={handleGmailClick}>
        <i className="fas fa-envelope"></i>
        <div className="contact-tooltip">Send an Email</div>
      </div>
    </div>
  );
};

export default ContactIcons;