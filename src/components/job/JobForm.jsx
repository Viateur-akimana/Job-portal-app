import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobForm = ({ employerId }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "", // Corrected typo in the state variable name
    jobType: "",
    employerId: employerId,
  });
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

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
      const response = await fetch("https://jobboard-0da3.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const data = await response.json();
      alert("Job created successfully:", data);
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
      // You may want to add a success message or redirect to job listings page
    } catch (error) {
      console.error("Error creating job:", error.message);
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
