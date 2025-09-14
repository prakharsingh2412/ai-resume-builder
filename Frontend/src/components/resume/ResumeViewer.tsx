import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResumeById } from '../../services/resume';

const ResumeViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);
        setResume(data);
      } catch (err) {
        setError('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{resume.jobTitle}</h1>
      <p>{resume.content}</p>
      <p>Created at: {new Date(resume.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ResumeViewer;