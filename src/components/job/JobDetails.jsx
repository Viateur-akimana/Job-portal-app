import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import "../../assets/css/styles.css";

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jobboard-0da3.onrender.com/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    if (!applicationData.name || !applicationData.email || !applicationData.mobile || !applicationData.resume) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`https://jobboard-0da3.onrender.com/api/apply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      alert("Application submitted successfully");
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex align-items-center mb-3">
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Back
        </Button>
        <h2 className="mb-4 margin-top">Job Details</h2>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{job.title}</h3>
            <p className="card-subtitle mb-2 text-muted">{job.company}</p>
            <p className="card-text">{job.description}</p>

            <h4 className="mt-4">Apply for this Job</h4>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                name="name"
                value={applicationData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Your Email"
                variant="outlined"
                type="email"
                name="email"
                value={applicationData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Your Mobile Number"
                variant="outlined"
                type="tel"
                name="mobile"
                value={applicationData.mobile}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                // Add any validation attributes as needed
              />
              <TextField
                label="Resume Link"
                variant="outlined"
                name="resume"
                value={applicationData.resume}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                // Add any validation attributes as needed
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default JobDetailPage;
