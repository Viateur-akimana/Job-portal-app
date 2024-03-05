import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
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
    // employerId: employerId,
  });
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "employerId") {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check for required fields
      const requiredFields = ['title', 'description', 'company', 'location', 'jobType'];
      for (const field of requiredFields) {
        if (!jobData[field]) {
          setFormError(`Please fill in all required fields.`);
          return;
        }
      }
  
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("title", jobData.title);
      formData.append("description", jobData.description);
      formData.append("company", jobData.company);
      formData.append("location", jobData.location);
      formData.append("salary", jobData.salary);
      formData.append("jobType", jobData.jobType);
  
      // Send a POST request to your backend to create a new job
      const response = await axios.post(
        "http://localhost:3000/api/jobs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (!response.data) {
        throw new Error("Failed to create job");
      }
  
      // Display success message
      // You can replace this with a Snackbar or other UI component
      alert("Job created successfully:", response.data);
  
      // Redirect to job listings page or show a success message
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      // Display error message to the user
      setFormError("Failed to create job. Please try again.");
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
          margin="dense" // Change "normal" to "dense" or "none"
        />

        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={jobData.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          multiline
        />
        <TextField
          label="Company"
          variant="outlined"
          name="company"
          value={jobData.company}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Location"
          variant="outlined"
          name="location"
          value={jobData.location}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
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
          margin="dense"
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
