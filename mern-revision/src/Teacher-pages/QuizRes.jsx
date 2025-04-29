import React, { useState, useEffect } from 'react';

const QuizBuilder = () => {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('quiz-questions');
    return saved ? JSON.parse(saved) : [];
  });

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], correctOption: 0, marks: 1 }]);
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  useEffect(() => {
    localStorage.setItem('quiz-questions', JSON.stringify(questions));
  }, [questions]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Builder</h1>
      <button onClick={addQuestion} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">Add Question</button>
      {questions.map((q, i) => (
        <div key={i} className="mb-6 p-4 border rounded-lg bg-gray-100">
          <label className="block font-semibold mb-1">Question {i + 1}</label>
          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Enter question text"
            value={q.text}
            onChange={(e) => updateQuestion(i, 'text', e.target.value)}
          />

          <label className="block font-semibold mb-1">Marks</label>
          <input
            type="number"
            className="w-24 p-2 mb-2 border rounded"
            value={q.marks}
            onChange={(e) => updateQuestion(i, 'marks', parseInt(e.target.value))}
          />

          <label className="block font-semibold mb-1">Options</label>
          {q.options.map((opt, j) => (
            <div key={j} className="flex items-center mb-2">
              <input
                className="flex-1 p-2 border rounded mr-2"
                value={opt}
                onChange={(e) => updateOption(i, j, e.target.value)}
              />
              <input
                type="radio"
                name={`correct-${i}`}
                checked={q.correctOption === j}
                onChange={() => updateQuestion(i, 'correctOption', j)}
              /> Correct
            </div>
          ))}
          <button onClick={() => addOption(i)} className="px-3 py-1 text-sm bg-green-600 text-white rounded">Add Option</button>
        </div>
      ))}
    </div>
  );
};

export default QuizBuilder;
