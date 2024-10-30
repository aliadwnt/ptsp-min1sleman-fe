import React, { useEffect } from 'react';

const Modal = ({ showModal, handleClose, children }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
