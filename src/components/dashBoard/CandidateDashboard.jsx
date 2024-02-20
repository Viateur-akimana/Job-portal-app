import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/styles.css";
const CandidateDashboard = ({ name }) => {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch candidate profile
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/candidate/profile"); // Update endpoint
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Fetch available jobs
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobs"); // Update endpoint
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  return (
    <div className="container margin-top">
      <h2>Welcome, {name}!</h2>

      <h3>Your Profile</h3>
      <p>Email: {profile.email}</p>
      <p>Skills: {profile.skills}</p>

      <h3>Job Applications</h3>
      {profile.applications && profile.applications.length > 0 ? (
        <ul>
          {profile.applications.map((application) => (
            <li key={application.jobId}>Applied for: {application.jobTitle}</li>
          ))}
        </ul>
      ) : (
        <p>No job applications yet.</p>
      )}

      <h3>Available Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.title} - <Link to={`/apply/${job._id}`}>Apply Now</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateDashboard;
