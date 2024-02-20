// JobApplicationForm.js

import React, { useState } from "react";

const JobApplicationForm = () => {
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApplicationData({ ...applicationData, resume: file });
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("fullName", applicationData.fullName);
    formData.append("email", applicationData.email);
    formData.append("phone", applicationData.phone);
    formData.append("resume", applicationData.resume);
    formData.append("coverLetter", applicationData.coverLetter);

    // Send a POST request to your backend to submit the job application
    fetch("https://jobboard-0da3.onrender.com/api/job-applications", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Application submitted successfully:", data);
        // You may want to add a success message or redirect to a confirmation page
      })
      .catch((error) => console.error("Error submitting application:", error));
  };

  return (
    <div>
      <h3>Job Application Form</h3>
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

        {/* Add more input fields for other application details as needed */}

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
