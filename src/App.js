// src/App.js
import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import QuestionEditor from './components/QuestionEditor';
import defaultQuestions from './data/questions';
import './styles.css';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Load questions from localStorage or use defaults
    const savedQuestions = localStorage.getItem('languageFeudQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      setQuestions(defaultQuestions);
    }
  }, []);
  
  const handleSaveQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>Chinese Feud</h1>
        <button 
          className="toggle-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Play Game' : 'Edit Questions'}
        </button>
      </header>
      
      {isEditing ? (
        <QuestionEditor 
          initialQuestions={questions} 
          onSave={handleSaveQuestions} 
        />
      ) : (
        questions.length > 0 ? (
          <Game questions={questions} />
        ) : (
          <div className="no-questions-message">
            <h2>No questions available!</h2>
            <p>Click "Edit Questions" to add some questions to your game.</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;