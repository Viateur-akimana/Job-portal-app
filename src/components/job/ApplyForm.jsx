import React, { useState } from 'react';

const ApplyForm = ({ job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null
  });

  const { name, email, resume } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = e => setFormData({ ...formData, resume: e.target.files[0] });

  const handleSubmit = e => {
    e.preventDefault();
    // Create FormData object
    const formDataObj = new FormData();
    formDataObj.append('name', name);
    formDataObj.append('email', email);
    formDataObj.append('resume', resume); // Append resume file
    // Implement job application submission functionality using API
    console.log('Application Data:', formDataObj);
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      resume: null
    });
  };

  return (
    <div className="apply-form">
      <h3>Apply for {job.title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Resume</label>
          <input type="file" name="resume" onChange={handleFileChange} required />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyForm;
