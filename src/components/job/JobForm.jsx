import React, { useState } from 'react';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: ''
  });

  const { title, company, location, description, requirements } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      company: '',
      location: '',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className="job-form">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input type="text" name="company" value={company} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={location} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea name="requirements" value={requirements} onChange={onChange} required />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
