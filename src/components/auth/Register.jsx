import React, { useState } from "react";
import "../../assets/css/styles.css";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

const Register = () => {
  const navigate= useNavigate()
 
  const [data, setData] = useState({
    username: "",
    email: "", // Added email field
    password: "",
    role: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors,setErrors] = useState({})

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
        setErrors(null);
        navigate('/login');
      } else {
        setSuccessMessage(null);
        if (response.data.errors && response.data.errors.role) {
          setErrors({ role: response.data.errors.role.message });
        } else {
          setErrors(
            response.data.message ||
              "Registration failed. Please check your information."
          );
        }
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage(null);
      setErrors("Error during registration. Please try again.");
    
     
    }
  };

  return (
    <div className="container mt-5">
      <div className="card border-primary margin-top">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Registration</h5>
        </div>
        <div className="card-body">
        {errors.general && <h3 className="text-danger text-size">{errors.general}</h3>}
          {successMessage && <p className="text-success">{successMessage}</p>}
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
              {errors.username && <p className="text-danger">{errors.username}</p>}
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
               {errors.email && <p className="text-danger">{errors.email}</p>}
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
               {errors.password && <p className="text-danger">{errors.password}</p>}
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
              {errors.role && <p className="text-danger">{errors.role}</p>}
            </div>
            <button type="submit" className="btn btn-primary" onSubmit={()=>handleSubmit()}>
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

export default Register;