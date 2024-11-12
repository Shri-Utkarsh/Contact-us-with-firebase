import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal content with fixed width */}
          <div className="relative z-50 min-h-[200px] w-full max-w-[600px] bg-white p-4 mx-4">
            <div className="flex justify-end">
              <button onClick={onClose} className="text-2xl font-medium">
                X
              </button>
            </div>
            {children}
          </div>
          {/* Background overlay with blur effect */}
          <div className="fixed inset-0 z-40 backdrop-blur bg-black/30" onClick={onClose} />
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
