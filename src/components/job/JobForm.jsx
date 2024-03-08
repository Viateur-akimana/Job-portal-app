import React, { useState } from "react";
import { Button, TextField, Select, MenuItem, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobForm = ({ employerId = null }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
  });
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    const requiredFields = ['title', 'description', 'company', 'location', 'jobType'];
    for (const field of requiredFields) {
      if (!jobData[field]) {
        setFormError(`Please fill in all required fields.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobs/create",
        jobData
      );

      if (!response.data) {
        throw new Error("Failed to create job");
      }

      // Display success message
      alert("Job created successfully:", response.data);

      // Redirect to job listings page or show a success message
      navigate("/employer-dashboard");
    } catch (error) {
      console.error("Error creating job:", error);
      setFormError("Failed to create job. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Create a New Job
        </Typography>
    
        {formError && <Typography variant="body1" style={{ color: "red" }}>{formError}</Typography>}
        <form onSubmit={handleJobSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                variant="outlined"
                name="company"
                value={jobData.company}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                variant="outlined"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Salary"
                variant="outlined"
                name="salary"
                value={jobData.salary}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Job Type"
                variant="outlined"
                name="jobType"
                value={jobData.jobType}
                onChange={handleInputChange}
                fullWidth
                required
              >
                <MenuItem value="">-Select-</MenuItem>
                <MenuItem value="part-time">Part Time</MenuItem>
                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="work-from-home">Work from Home</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default JobForm;
