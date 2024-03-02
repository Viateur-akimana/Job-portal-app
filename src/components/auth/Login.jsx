import React, { useState } from "react";
import "../../assets/css/styles.css";
import AuthService from "../../AuthService.js";
import { useNavigate,Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);

      if (response.data.success) {
        // Authentication successful, set user role and trigger onLogin
        const userRole = response.data.role; // Assuming your backend returns the user role
        const profileName = response.data.Name;
        const id = response.data.id;
        console.log(id);
        onLogin(userRole, profileName, id);

        // Store userRole in localStorage if needed
        localStorage.setItem("userRole", userRole);
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        // Handle authentication failure (e.g., incorrect credentials)
        setError("Invalid credentials");
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error during login:", error);
      setError("Error during login. Please try again later.");
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
            <label className="form-label">Username or Email:</label>
            <input
              type="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
