import React from 'react';
import './recent.css';

const Alert = ({ message, onClose }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p>{message}</p>
        <button className="ok-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Alert;
