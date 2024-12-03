// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className=" rounded-lg shadow-lg z-10 p-6 max-w-sm w-full">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
