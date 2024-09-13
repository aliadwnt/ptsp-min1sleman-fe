// Accordion.js
import React, { useState, useEffect } from 'react';

// Inline CSS as a string
const accordionStyles = `
  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    font-size: 15px;
    transition: 0.4s;
  }

  .accordion.active {
    background-color: #ccc;
  }

  .accordion-icon {
    float: right;
    margin-left: 5px;
  }

  .accordion-icon.active {
    transform: rotate(180deg);
  }

  .panel {
    padding: 0 18px;
    display: none;
    background-color: white;
    overflow: hidden;
  }

  .panel.open {
    display: block;
  }
`;

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Append CSS styles to the head of the document
    const style = document.createElement('style');
    style.innerHTML = accordionStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <button
        className={`accordion ${isOpen ? 'active' : ''}`}
        onClick={toggle}
      >
        {title}
        <span className={`accordion-icon ${isOpen ? 'active' : ''}`} />
      </button>
      <div className={`panel ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
