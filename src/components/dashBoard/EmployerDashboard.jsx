import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { CircularProgress, Container, List, ListItem, ListItemText, Button } from "@mui/material";

const EmployerDashboard = (props) => {
  const { employerId } = props;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(employerId);
    // Fetch jobs posted by the employer
    fetch(`https://jobboard-0da3.onrender.com/api/employer/jobs/${employerId}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [employerId]);

  const handleDeleteJob = async (jobId) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return; // Do nothing if the user cancels the deletion
    }

    try {
      const response = await fetch(`https://jobboard-0da3.onrender.com/api/job/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Remove the deleted job from the state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error.message);
      // Handle the error, show a message to the user, etc.
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
              <Delete
                style={{ cursor: "pointer" }}
                className="text-danger"
                onClick={() => handleDeleteJob(job._id)}
              />
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
        <Button component={Link} to="/job-posting" variant="contained" color="primary">
          Click to Post Jobs
        </Button>
      )}
    </Container>
  );
};

export default EmployerDashboard;
