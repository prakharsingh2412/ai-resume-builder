import React from 'react';
import { useParams } from 'react-router-dom';
import { getJobDetails } from '../../services/job';
import type { Job } from '../../types/job';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    const fetchJobDetails = async () => {
      try {
        const data = await getJobDetails(id);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!job) return <div>No job found</div>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default JobDetails;
