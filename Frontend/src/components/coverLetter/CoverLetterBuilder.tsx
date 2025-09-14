import React, { useState } from 'react';
import { generateCoverLetter } from '../../services/coverLetter';

const CoverLetterBuilder = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await generateCoverLetter({ jobTitle, content });
      setSuccessMessage('Cover letter generated successfully!');
      // Handle response as needed
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cover Letter Builder</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Cover Letter'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default CoverLetterBuilder;