import React, { useState } from 'react';
import axios from 'axios';

const JobScraper: React.FC = () => {
  const [url, setUrl] = useState('');
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScrape = async () => {
    try {
      const response = await axios.post('/api/jobs/scrape', { url });
      setJobDetails(response.data.job);
      setError('');
    } catch (err) {
      setError('Failed to scrape job details. Please check the URL and try again.');
      setJobDetails(null);
    }
  };

  return (
    <div>
      <h2>Job Scraper</h2>
      <input
        type="text"
        placeholder="Enter LinkedIn job URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape Job</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jobDetails && (
        <div>
          <h3>Job Details</h3>
          <p><strong>Title:</strong> {jobDetails.title}</p>
          <p><strong>Company:</strong> {jobDetails.company}</p>
          <p><strong>Description:</strong> {jobDetails.description}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default JobScraper;