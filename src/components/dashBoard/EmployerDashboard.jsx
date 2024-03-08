import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Container, List, ListItem, ListItemText, Button, Typography, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const EmployerDashboard = ({ employerId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [employerId]);

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error.message);
    }
  };

  const handleEditJob = async (jobId) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/jobs/${jobId}`);
      setJobs((prevJobs) => {
        const updatedJobs = [...prevJobs];
        const index = updatedJobs.findIndex(job => job._id === jobId);
        if (index !== -1) {
          updatedJobs[index] = response.data;
        }
        return updatedJobs;
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="mt-5">
      <Typography variant="h4" gutterBottom mb={4}>Your Posted Jobs</Typography>
      {loading ? (
        <>
          <div className="alert alert-info">Loading Jobs... </div>
          <div className="text-center">
            <CircularProgress />
          </div>
        </>
      ) : (
        <List>
          {jobs.map((job) => (
            <ListItem
              key={job._id}
              disablePadding
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}
            >
              <div>
                <ListItemText
                  primary={<Typography variant="h6">{job.title}</Typography>}
                  secondary={<Typography variant="subtitle2"> {job.jobType}</Typography>}
                />
              </div>
              <div>
                <IconButton onClick={() => handleEditJob(job._id)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteJob(job._id)}>
                  <Delete color="error" />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h4" className="mb-4">Post Your Jobs</Typography>
      {loading ? (
        <>
          <div className="alert alert-info">Loading Jobs Posting Features...</div>
          <div className="text-center">
            <CircularProgress />
          </div>
        </>
      ) : (
        <Button component={Link} to="/post-job" variant="contained" color="primary">
          Click to Post Jobs
        </Button>
      )}
    </Container>
  );
};

export default EmployerDashboard;
