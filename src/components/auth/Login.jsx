import React, { useState } from "react";
import "../../assets/css/styles.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });
  
      const token = response.data.token; // Extract JWT token from response
  
      if (token) {
        // Store JWT token securely (e.g., in local storage)
        localStorage.setItem('token', token);
  
        // Redirect user to home page or perform other actions
        alert('Login Successful!');
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again later.');
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="card border-primary margin-top">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Login</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <Link to="/register" className="mt-3">
            Not yet have an account? Click here to register.
          </Link>
          {error && <h3 className="text-danger text-size">{error}</h3>}
        </div>
      </div>
    </div>
  );
};

export default Login;
