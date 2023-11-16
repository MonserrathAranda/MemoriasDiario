import React from 'react';

const ModalButton3 = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Hola</p>
      </div>
    </div>
  );
};

export default ModalButton3;