import React, { useState } from "react";

export const Rule = ({title,content}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="border rounded-lg shadow-md p-4">
        <button
          onClick={toggleContent}
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-200 w-full text-left"
        >
          {isOpen ? "▼" : "▶"}{title}
        </button>
        {isOpen && (
          <div className="mt-4 text-gray-700">
            <p>
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

