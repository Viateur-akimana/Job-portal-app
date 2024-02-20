import React, { useState } from "react";
import "../../assets/css/styles.css";
import AuthService from "../../AuthService.js";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  // const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(
        credentials.username,
        credentials.password,
        credentials.role
      );

      if (response.success) {
        setSuccessMessage("Registration successful! You can now log in.");
        alert("You can Login Now!");
        setError(null);
        // Redirect to the login page after successful registration
      } else {
        setSuccessMessage(null);
        setError(
          response.data.message ||
            "Registration failed. Please check your information."
        );
      }
    } catch (error) {
      setSuccessMessage(null);
      setError("Error during registration. Please try again ");
      alert("Error during RegistrationForm");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card border-primary margin-top">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Registration</h5>
        </div>
        <div className="card-body">
          {error && <h3 className="text-danger text-size">{error}</h3>}
          {successMessage && (
            <p className="text-success text">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username or Email:
              </label>
              <input
                type="username"
                className="form-control"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Job-Seeker OR Recruiter:</label>
              <select
                className="form-control"
                name="role"
                id="role"
                value={credentials.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -Select-
                </option>
                <option value="candidate">Job Seeker</option>
                <option value="employer">Recruiter</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <br />
            <br />
            <Link to="/login" className="mt-3">
              Have an account? Click here to login.
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
