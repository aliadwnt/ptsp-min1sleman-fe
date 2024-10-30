import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        className={`flex items-center justify-between w-full p-4 text-left text-gray-700 text-lg font-medium transition-all duration-300 ${
          isOpen ? 'bg-gray-300' : 'bg-gray-200'
        }`}
        onClick={toggle}
      >
        {title}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-4 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;