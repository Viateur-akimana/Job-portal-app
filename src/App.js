import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import CandidateDashboard from "./components/dashBoard/CandidateDashboard";
import EmployerDashboard from "./components/dashBoard/EmployerDashboard";
import JobDetail from "./components/job/JobDetails";
import NotFound from "./pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import JobList from "./components/job/JobList";
import ApplyForm from "./components/job/ApplyForm";
import JobForm from "./components/job/JobForm";
import Navbar from "./components/layout/Navbar";
import Contact from "./pages/contact";

const App = () => {
  return (
    <Router>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/post-job" element={<JobForm />} />
        <Route path="/apply/:id" element={<ApplyForm />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
