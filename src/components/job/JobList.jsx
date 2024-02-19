import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} className="job-item">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <Link to={`/job/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;
