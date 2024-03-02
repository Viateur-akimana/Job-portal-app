import React, { useState } from "react";
import "../../assets/css/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "", // Added email field
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      if (response.data.success) {
        setSuccessMessage("Registration successful! You can now log in.");
        setError(null);
      } else {
        setSuccessMessage(null);
        setError(
          response.data.message ||
            "Registration failed. Please check your information."
        );
      }
    } catch (error) {
      setSuccessMessage(null);
      setError("Error during registration. Please try again.");
      console.log(error);
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
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data.email}
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
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Employer OR Candidate:</label>
              <select
                className="form-control"
                name="role"
                id="role"
                value={data.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -Select-
                </option>
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
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
