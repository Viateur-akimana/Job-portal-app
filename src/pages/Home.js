import React from 'react';
import JobList from '../components/job/JobList';

const Home = ({ jobs }) => {
  return (
    <div className="home">
      <h2>Welcome to Job Board</h2>
      <h3>Featured Job Listings</h3>
      <JobList jobs={jobs} />
    </div>
  );
};

export default Home;
