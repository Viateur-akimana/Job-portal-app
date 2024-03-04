import React from "react";
import { Link } from "react-router-dom";

const ApplicationConfirmation = ({ applicationDetails }) => {
  return (
    <div>
      <h2>Application Submitted Successfully!</h2>
      <p>Thank you for applying for the position of {applicationDetails.jobTitle}.</p>
      <h3>Application Details:</h3>
      <ul>
        <li>Job Title: {applicationDetails.jobTitle}</li>
        <li>Applicant Name: {applicationDetails.fullName}</li>
        <li>Email: {applicationDetails.email}</li>
        <li>Phone: {applicationDetails.phone}</li>
        {/* Add more application details as needed */}
      </ul>
      <p>We will review your application and contact you if you are selected for an interview.</p>
      <Link to="/">Return to Dashboard</Link>
    </div>
  );
};

export default ApplicationConfirmation;
