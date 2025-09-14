import React, { useEffect, useState } from 'react';
import { getCoverLetters } from '../../services/coverLetter';
import { CoverLetter } from '../../types/coverLetter';

const CoverLetterList: React.FC = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const data = await getCoverLetters();
        setCoverLetters(data);
      } catch (err) {
        setError('Failed to fetch cover letters');
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Cover Letters</h2>
      <ul>
        {coverLetters.map((coverLetter) => (
          <li key={coverLetter._id}>
            <h3>{coverLetter.jobTitle}</h3>
            <p>{coverLetter.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoverLetterList;