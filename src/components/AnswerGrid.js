// src/components/AnswerGrid.js
import React from 'react';
import AnswerCard from './AnswerCard';

function AnswerGrid({ answers, revealedAnswers, onReveal }) {
  // Create arrays for each column
  const column1 = answers.slice(0, 4);
  const column2 = answers.slice(4, 8);

  return (
    <div className="answer-grid">
      {/* Column 1 - Questions 1-4 */}
      <div className="answer-column">
        {column1.map((answer, index) => (
          <AnswerCard
            key={index}
            number={index + 1}
            answer={answer}
            isRevealed={revealedAnswers[index]}
            onClick={() => onReveal(index)}
          />
        ))}
      </div>
      
      {/* Column 2 - Questions 5-8 */}
      <div className="answer-column">
        {column2.map((answer, index) => (
          <AnswerCard
            key={index + 4}
            number={index + 5}
            answer={answer}
            isRevealed={revealedAnswers[index + 4]}
            onClick={() => onReveal(index + 4)}
          />
        ))}
      </div>
    </div>
  );
}

export default AnswerGrid;