import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { CircularProgress, Container, List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";

const EmployerDashboard = (props) => {
  const { employerId } = props;

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
    <Container className="mt-5">
      <h2 className="mb-4">Your Posted Jobs</h2>
      {loading ? (
        <>
          <div className="alert alert-info">Loading Jobs... </div>
          <div className="text-center">
            <CircularProgress />
          </div>
        </>
      ) : (
        <List className="mb-4">
          {jobs.map((job) => (
            <ListItem
              key={job._id}
              disablePadding
              className="d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/employer-dashboard/${employerId}/${job._id}/applications`}
                className="text-decoration-none"
              >
                <ListItemText primary={job.title} />
              </Link>
              <div>
                <Edit
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  className="text-primary"
                  onClick={() => handleEditJob(job._id)}
                />
                <Delete
                  style={{ cursor: "pointer" }}
                  className="text-danger"
                  onClick={() => handleDeleteJob(job._id)}
                />
              </div>
            </ListItem>
          ))}
        </List>
      )}

      <h2 className="mb-4">Post Your Jobs</h2>
      {loading ? (
        <>
          <div className="alert alert-info">
            Loading Jobs Posting Features...
          </div>
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
