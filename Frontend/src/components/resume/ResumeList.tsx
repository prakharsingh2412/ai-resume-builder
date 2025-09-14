import React, { useEffect, useState } from 'react';
import { getResumes } from '../../services/resume';
import type { Resume } from '../../types/resume';

const ResumeList: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data);
      } catch (err) {
        setError('Failed to fetch resumes');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Resumes</h2>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            <h3>{resume.jobTitle}</h3>
            <p>{resume.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;