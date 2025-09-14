import React, { useState } from 'react';
import { generateInterviewQuestions } from '../../services/interview';

const InterviewQuestions: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generateInterviewQuestions(jobTitle);
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Interview Questions</h2>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter job title"
      />
      <button onClick={handleGenerateQuestions} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewQuestions;