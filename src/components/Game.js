// src/components/Game.js
import React, { useState } from 'react';
import Question from './Question';
import AnswerGrid from './AnswerGrid';
import NavigationBar from './NavigationBar';

function Game({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState(
    Array(questions.length).fill().map(() => Array(8).fill(false))
  );
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleRevealAnswer = (index) => {
    const newRevealedAnswers = [...revealedAnswers];
    newRevealedAnswers[currentQuestionIndex][index] = true;
    setRevealedAnswers(newRevealedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  return (
    <div className="game-container">
      <Question text={currentQuestion.question} />
      <AnswerGrid 
        answers={currentQuestion.answers}
        revealedAnswers={revealedAnswers[currentQuestionIndex]}
        onReveal={handleRevealAnswer}
      />
      <NavigationBar 
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
      />
    </div>
  );
}

export default Game;