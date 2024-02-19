import React from 'react';

const CandidateDashboard = ({ appliedJobs }) => {
  return (
    <div className="dashboard">
      <h2>Candidate Dashboard</h2>
      <h3>Applied Jobs:</h3>
      <ul>
        {appliedJobs.map(job => (
          <li key={job.id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateDashboard;
