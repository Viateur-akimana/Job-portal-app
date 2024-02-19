import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <p>{job.requirements}</p>
      {/* Add Apply Button */}
    </div>
  );
};

export default JobDetail;
