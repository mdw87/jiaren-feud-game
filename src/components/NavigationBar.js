// src/components/NavigationBar.js
import React from 'react';

function NavigationBar({ currentQuestion, totalQuestions, onPrevious, onNext }) {
  return (
    <div className="navigation-bar">
      <button 
        className="nav-button prev-button" 
        onClick={onPrevious}
        disabled={currentQuestion === 0}
      >
        Previous
      </button>
      
      <div className="question-counter">
        Question {currentQuestion + 1}/{totalQuestions}
      </div>
      
      <button 
        className="nav-button next-button"
        onClick={onNext}
        disabled={currentQuestion === totalQuestions - 1}
      >
        Next
      </button>
    </div>
  );
}

export default NavigationBar;