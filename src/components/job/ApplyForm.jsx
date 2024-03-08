import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import axios from "axios";

const JobApplicationForm = () => {
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApplicationData({ ...applicationData, resume: file });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", applicationData.fullName);
    formData.append("email", applicationData.email);
    formData.append("phone", applicationData.phone);
    formData.append("resume", applicationData.resume);
    formData.append("coverLetter", applicationData.coverLetter);

    try {
      const response = await axios.post("http://localhost:3000/api/jobs/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Application submitted successfully!");
      setErrorMessage("");
      console.log("Server response:", response.data); // Log the response data
      window.location.href = "/confirmation";
    } catch (error) {
      setErrorMessage("Failed to submit application. Please try again.");
      setSuccessMessage("");
      console.error("Error submitting application:", error);
    }
  };

  return (
    <Container maxWidth="md" >
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Job Application Form
        </Typography>
        {successMessage && (
          <Typography variant="body1" sx={{ color: "green", marginBottom: 2 }}>
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" sx={{ color: "red", marginBottom: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleApplicationSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={applicationData.fullName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={applicationData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={applicationData.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                name="resume"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="contained" component="span" fullWidth>
                  Upload Resume
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cover Letter"
                name="coverLetter"
                value={applicationData.coverLetter}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Submit Application
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default JobApplicationForm;
