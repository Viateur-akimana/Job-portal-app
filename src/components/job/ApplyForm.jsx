import React, { useState } from "react";
import axios from "axios";

const JobApplicationForm = () => {
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApplicationData({ ...applicationData, resume: file });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fullName", applicationData.fullName);
    formData.append("email", applicationData.email);
    formData.append("phone", applicationData.phone);
    formData.append("resume", applicationData.resume);
    formData.append("coverLetter", applicationData.coverLetter);
  
    try {
      const response = await axios.post("http://localhost:3000/api/jobs/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setSuccessMessage("Application submitted successfully!");
      setErrorMessage("");
      console.log("Server response:", response.data); // Log the response data
      window.location.href = "/confirmation";
    } catch (error) {
      setErrorMessage("Failed to submit application. Please try again.");
      setSuccessMessage("");
      console.error("Error submitting application:", error);
    }
  };
  

  return (
    <div>
      <h3>Job Application Form</h3>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleApplicationSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={applicationData.fullName}
          onChange={handleInputChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={applicationData.email}
          onChange={handleInputChange}
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={applicationData.phone}
          onChange={handleInputChange}
        />

        <label>Resume:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          name="resume"
          onChange={handleFileChange}
        />

        <label>Cover Letter:</label>
        <textarea
          name="coverLetter"
          value={applicationData.coverLetter}
          onChange={handleInputChange}
        />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
