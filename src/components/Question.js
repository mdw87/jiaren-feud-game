// src/components/Question.js
import React from 'react';

function Question({ text }) {
  return (
    <div className="question-container">
      <h1>{text}</h1>
    </div>
  );
}

export default Question;