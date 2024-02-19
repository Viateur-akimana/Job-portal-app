// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="search">
         <SearchIcon className="icon" />
       
          <div className="text">
          <h2>Job Board </h2>
          <span>Find your dream job</span>
          </div>
         
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/candidate-dashboard">Candidate Dashboard</Link>
          </li>
          <li>
            <Link to="/employer-dashboard">Employer Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
