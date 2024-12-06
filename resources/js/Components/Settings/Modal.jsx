export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1a1a1b] rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
          {children}
        </div>
      </div>
    );
  }