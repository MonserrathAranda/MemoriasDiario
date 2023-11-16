import React from 'react';

const ModalButton2 = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Hola </p>
      </div>
    </div>
  );
};

export default ModalButton2;