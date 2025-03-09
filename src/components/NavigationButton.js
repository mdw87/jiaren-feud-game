// src/components/NavigationButton.js
import React from 'react';

function NavigationButton({ onClick }) {
  return (
    <div className="next-button-container">
      <button className="next-button" onClick={onClick}>
        Next
      </button>
    </div>
  );
}

export default NavigationButton;