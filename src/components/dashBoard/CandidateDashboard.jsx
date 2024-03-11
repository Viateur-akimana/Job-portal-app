import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  jobItem: {
    marginBottom: theme.spacing(3), 
    
    padding: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0, 
    },
  },
}));

const CandidateDashboard = ({ name }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/candidate/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  return (
    <Container className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Welcome, {name}!
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        <Typography variant="body1">Email: {profile.email}</Typography>
        <Typography variant="body1">Skills: {profile.skills}</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Job Applications
        </Typography>
        {profile.applications && profile.applications.length > 0 ? (
          <ul>
            {profile.applications.map((application) => (
              <li key={application.jobId}>Applied for: {application.jobTitle}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No job applications yet.</Typography>
        )}
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Available Jobs
        </Typography>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Paper className={classes.jobItem} elevation={2}>
                <Typography variant="h5">{job.title}</Typography>
                <Typography variant="body1">Company: {job.company}</Typography>
                <Typography variant="body1">Salary: ${job.salary}</Typography>
                <Button variant="contained" component={Link} to={`/apply/${job._id}`} color="primary">
                  Apply Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default CandidateDashboard;
