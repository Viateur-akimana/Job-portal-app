import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/styles.css";

const CandidateDashboard = ({ name }) => {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

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

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post("http://localhost:3000/api/jobs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.fileName) {
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

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

      <h3>Upload Resume</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadSuccess && <p>Resume uploaded successfully!</p>}
    </div>
  );
};

export default CandidateDashboard;
