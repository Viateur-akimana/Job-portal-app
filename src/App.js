import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={<Login />} />
        <Route path="/register" component={<Register />} />
        <Route path="/login-register" component={<LoginRegister />} />
        <Route path="/candidate-dashboard" component={<CandidateDashboard />} />
        <Route path="/employer-dashboard" component={<EmployerDashboard />} />
        <Route path="/jobs" component={<JobList />} />
        <Route path="/job/:id" component={<JobDetail />} />
        <Route path="/post-job" component={<JobForm />} />
        <Route path="/apply/:id" component={<ApplyForm />} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
