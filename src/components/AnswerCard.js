// src/components/AnswerCard.js
import React from 'react';

function AnswerCard({ number, answer, isRevealed, onClick }) {
  return (
    <div 
      className={`answer-card ${isRevealed ? 'revealed' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <span>{number}</span>
        </div>
        <div className="card-back">
          <span>{answer}</span>
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;