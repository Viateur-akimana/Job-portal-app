import React from 'react';
import JobForm from '../job/JobForm';

const EmployerDashboard = () => {
  const handleJobSubmit = formData => {
    // Implement job submission functionality using API
    console.log('Job Form Data:', formData);
  };

  return (
    <div className="dashboard">
      <h2>Employer Dashboard</h2>
      <JobForm onSubmit={handleJobSubmit} />
    </div>
  );
};

export default EmployerDashboard;
