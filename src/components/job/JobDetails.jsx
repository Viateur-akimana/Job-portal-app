import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Container, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleApplyJob = () => {
    navigate(`/apply/${id}`);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <div className="d-flex align-items-center mb-3">
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Back
        </Button>
        <Typography variant="h4" mb={4} ml={2}>Job Details</Typography>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" mb={2}>{job.title}</Typography>
              <Typography variant="subtitle1" mb={2}><strong>Company:</strong>{job.company}</Typography>
              <Typography variant="body1" mb={2}><strong>Description:</strong> {job.description}</Typography>
              <Typography variant="body1" mb={2}><strong>Location:</strong> {job.location}</Typography>
              <Typography variant="body1" mb={2}><strong>Job Type:</strong> {job.jobType}</Typography>
              <Typography variant="body1" mb={2}><strong>Salary:</strong> ${job.salary}</Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyJob}
                sx={{ mt: 2 }}
              >
                Apply for Job
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default JobDetails;
