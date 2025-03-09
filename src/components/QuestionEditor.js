import React, { useState, useEffect } from 'react';

function QuestionEditor({ onSave, initialQuestions }) {
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [currentEdit, setCurrentEdit] = useState({
    question: "",
    answers: ["", "", "", "", "", "", "", ""]
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Load questions from localStorage when component mounts
    const savedQuestions = localStorage.getItem('languageFeudQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const saveQuestions = (updatedQuestions) => {
    // Save to localStorage
    localStorage.setItem('languageFeudQuestions', JSON.stringify(updatedQuestions));
    // Pass up to parent component
    if (onSave) onSave(updatedQuestions);
  };

  const handleQuestionChange = (e) => {
    setCurrentEdit({ ...currentEdit, question: e.target.value });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...currentEdit.answers];
    newAnswers[index] = value;
    setCurrentEdit({ ...currentEdit, answers: newAnswers });
  };

  const handleAddQuestion = () => {
    // Validate all fields are filled
    if (!currentEdit.question.trim()) {
      alert("Please enter a question");
      return;
    }
    
    const emptyAnswers = currentEdit.answers.filter(a => !a.trim()).length;
    if (emptyAnswers > 0) {
      alert("Please fill all 8 answer fields");
      return;
    }

    // Add new question or update existing
    let updatedQuestions;
    if (editIndex >= 0) {
      updatedQuestions = [...questions];
      updatedQuestions[editIndex] = currentEdit;
    } else {
      updatedQuestions = [...questions, currentEdit];
    }
    
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    
    // Reset form
    setCurrentEdit({
      question: "",
      answers: ["", "", "", "", "", "", "", ""]
    });
    setEditIndex(-1);
  };

  const handleEditQuestion = (index) => {
    setCurrentEdit(questions[index]);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
      saveQuestions(updatedQuestions);
    }
  };

  const handleMoveQuestion = (index, direction) => {
    if ((direction === -1 && index === 0) || 
        (direction === 1 && index === questions.length - 1)) {
      return;
    }
    
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index + direction];
    updatedQuestions[index + direction] = temp;
    
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL questions? This cannot be undone.")) {
      setQuestions([]);
      saveQuestions([]);
    }
  };

  const handleImport = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedQuestions = JSON.parse(event.target.result);
            // Validate imported data
            if (Array.isArray(importedQuestions) && 
                importedQuestions.every(q => q.question && Array.isArray(q.answers) && q.answers.length === 8)) {
              setQuestions(importedQuestions);
              saveQuestions(importedQuestions);
              alert("Questions imported successfully!");
            } else {
              alert("Invalid question format in the imported file.");
            }
          } catch (err) {
            alert("Error importing questions: " + err.message);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'language_feud_questions.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="question-editor">
      <h2>{editIndex >= 0 ? 'Edit Question' : 'Add New Question'}</h2>
      
      <div className="editor-form">
        <div className="form-group">
          <label>Question:</label>
          <input 
            type="text"
            value={currentEdit.question}
            onChange={handleQuestionChange}
            placeholder="Enter your question"
            className="question-input"
          />
        </div>
        
        <div className="answers-section">
          <label>Answers (from most to least common):</label>
          <div className="answers-grid">
            {currentEdit.answers.map((answer, index) => (
              <div key={index} className="answer-input-group">
                <span className="answer-number">{index + 1}.</span>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                  className="answer-input"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="editor-actions">
          <button onClick={handleAddQuestion} className="save-button">
            {editIndex >= 0 ? 'Update Question' : 'Add Question'}
          </button>
          {editIndex >= 0 && (
            <button onClick={() => {
              setCurrentEdit({
                question: "",
                answers: ["", "", "", "", "", "", "", ""]
              });
              setEditIndex(-1);
            }} className="cancel-button">
              Cancel Edit
            </button>
          )}
        </div>
      </div>
      
      <div className="questions-list">
        <h3>Your Questions ({questions.length})</h3>
        {questions.length === 0 ? (
          <p>No questions added yet. Create your first question above!</p>
        ) : (
          <div className="question-items">
            {questions.map((q, index) => (
              <div key={index} className="question-item">
                <div className="question-content">
                  <h4>{index + 1}. {q.question}</h4>
                  <div className="question-answers">
                    {q.answers.slice(0, 4).map((a, i) => (
                      <span key={i} className="question-answer">{i+1}. {a}</span>
                    ))}
                    {q.answers.slice(4, 8).map((a, i) => (
                      <span key={i+4} className="question-answer">{i+5}. {a}</span>
                    ))}
                  </div>
                </div>
                <div className="question-actions">
                  <button onClick={() => handleMoveQuestion(index, -1)} disabled={index === 0}>↑</button>
                  <button onClick={() => handleMoveQuestion(index, 1)} disabled={index === questions.length - 1}>↓</button>
                  <button onClick={() => handleEditQuestion(index)}>Edit</button>
                  <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bulk-actions">
          <button onClick={handleImport} className="import-button">Import Questions</button>
          <button onClick={handleExport} className="export-button" disabled={questions.length === 0}>Export Questions</button>
          <button onClick={handleClearAll} className="clear-button" disabled={questions.length === 0}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionEditor;