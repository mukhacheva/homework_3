import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose}>&#10005;</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
