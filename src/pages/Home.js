import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Container, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { LocationOn, ChevronRight } from "@mui/icons-material";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Dummy featured job listings data
  const featuredJobs = [
    { id: 1, title: "Software Engineer", company: "Tech Co.", location: "San Francisco, CA", salary: "100,000" },
    { id: 2, title: "Marketing Manager", company: "Marketing Inc.", location: "New York, NY", salary: "90,000" },
    { id: 3, title: "Graphic Designer", company: "Design Studio", location: "Los Angeles, CA", salary: "80,000" }
  ];

  return (
    <Container sx={{ marginTop: 5 }}>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <div className="jumbotron margin-top">
            <Typography variant="h1" sx={{ textAlign: "center", mb: 2 , fontSize: "1.9rem"}}>Welcome to the Job Board!</Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2,fontStyle:"oblique", color:"blue",fontSize:"em", textAlign:"center", display: { xs: "none", md: "flex" }}} >
              Find your dream job or attract the right talent.
            </Typography>

            <Typography variant="h2" sx={{ mb: 2 , fontSize:"1.5em", display: { xs: "none", md: "flex" }}}>Find More Jobs -</Typography>
            <Link to="/jobs" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Find More Jobs...
              </Button>
            </Link>
          </div>

          <Typography variant="h2" sx={{ mb: 2, textAlign: "center",fontSize:"1.2em", display:{ xs: "none", md: "flex" } }}>Featured Job Listings</Typography>
          <Grid container spacing={3}>
            {featuredJobs.map((job) => (
              <Grid key={job.id} item xs={12} md={4}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" mb={1}>{job.title}</Typography>
                    <Typography variant="subtitle1" mb={1}>{job.company}</Typography>
                    <Typography variant="body1" mb={1}><LocationOn /> Location: {job.location}</Typography>
                    <Typography variant="body1"><ChevronRight /> Salary: $ {job.salary}</Typography>
                    <Link to={`/jobs/${job.id}`} style={{ textDecoration: "none" }}>
                      <Button variant="outlined" color="primary" mt={2}>
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
