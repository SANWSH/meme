import React from 'react';
import './PersonalInfoModal.css';

interface PersonalInfoModalProps {
  onClose: () => void;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({ onClose }) => {

  const email = "scarobey.buy@gmail.com";
  const telegram = "https://t.me/SANWSHTG";
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Info card</h2>
        <p>Author: SANWHSH</p>
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>Telegram: <a href={telegram}>{telegram}</a></p>
      </div>
    </div>
  );
};

export default PersonalInfoModal; 