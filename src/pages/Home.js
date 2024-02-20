import { CircularProgress, Container, Button, Typography } from '@mui/material';
// import FeaturedJobListings from "./FeaturedJobListings";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from '../components/layout/Navbar';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an API call or any asynchronous operation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Container className="mt-5">
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="jumbotron margin-top">
          <Typography variant="h1" >Welcome to the Job Board!</Typography>
          <Typography variant="body1" component="p">
            Find your dream job or attract the right talent.
          </Typography>

          <Typography variant="h1">Find More Jobs -</Typography>
          <Link to="/jobs">
            <Button variant="outlined" color="primary">
              Find More Jobs...
            </Button>
          </Link>
          {/* <FeaturedJobListings /> */}
          {/* Add featured job listings or any other content you want on the home page */}
        </div>
      )}
    </Container>
  );
};

export default HomePage;
