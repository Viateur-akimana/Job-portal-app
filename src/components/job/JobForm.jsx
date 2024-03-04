import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobForm = ({ employerId }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    employerId: employerId,
  });
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in jobData) {
      if (!jobData[key]) {
        setFormError(`Please fill in all fields.`);
        return;
      }
    }

    try {
      // Send a POST request to your backend to create a new job
      const response = await axios.post("http://localhost:3000/api/jobs/create", jobData);

      if (!response.data || response.data.error) {
        throw new Error(response.data.error || "Failed to create job");
      }

      setSuccessMessage("Job created successfully!");
      // Reset form data and error after successful submission
      setJobData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        employerId: employerId,
      });
      setFormError("");
      // Redirect to job listings page after a short delay
      setTimeout(() => {
        navigate('/job-listings');
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      console.error("Error creating job:", error.message);
      setFormError("Failed to create job. Please try again.");
      // Handle the error, show a message to the user, etc.
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Replace history.goBack() with navigate(-1)
  };

  return (
    <div className="container margin-top">
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Back
      </Button>
      <h3>Create a New Job</h3>
      <p>Your employerId during the Submission of Job is : {employerId}</p>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleJobSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={jobData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={jobData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
        />
        <TextField
          label="Company"
          variant="outlined"
          name="company"
          value={jobData.company}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          variant="outlined"
          name="location"
          value={jobData.location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          variant="outlined"
          name="salary"
          value={jobData.salary}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          label="Job Type"
          variant="outlined"
          name="jobType"
          value={jobData.jobType}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">-Select-</MenuItem>
          <MenuItem value="part-time">Part Time</MenuItem>
          <MenuItem value="full-time">Full Time</MenuItem>
          <MenuItem value="work-from-home">Work from Home</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default JobForm;
