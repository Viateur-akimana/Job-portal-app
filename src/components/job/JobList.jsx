import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationOn, Business, ChevronRight } from "@mui/icons-material";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import { Container, Typography, TextField, CircularProgress, Grid, Card, CardContent, Button } from "@mui/material";
import "../../assets/css/styles.css";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jobs");
        const data = response.data;

        const filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setJobs(filteredJobs);
        setCurrentPage(1);

        if (location.state && location.state.currentPage) {
          setCurrentPage(location.state.currentPage);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const calculateTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime - postTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "just now";
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={4}>Explore Job Opportunities</Typography>

      <TextField
        type="text"
        placeholder="Search by title, company, or location"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        mb={4}
      />

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <div>
          <Grid container spacing={4}>
            {currentJobs.map((job) => (
              <Grid key={job._id} item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" mb={1}>{job.title}</Typography>
                    <Typography variant="subtitle1" mb={1}>{job.company}</Typography>
                    <Typography variant="body1" mb={1}><LocationOn /> Location: {job.location}</Typography>
                    <Typography variant="body1" mb={1}><Business /> Type: {job.jobType}</Typography>
                    <Typography variant="body1" mb={1}><ChevronRight /> Salary: $ {job.salary}</Typography>
                    <Typography variant="body1"><strong>Date Posted:</strong> {calculateTimeDifference(job.createdAt)}</Typography>
                    <Button
                      component={Link}
                      to={{
                        pathname: `/jobs/${job._id}`,
                        state: { currentPage },
                      }}
                      variant="contained"
                      color="primary"
                      mt={2}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={jobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </Container>
  );
};

export default JobListingsPage
