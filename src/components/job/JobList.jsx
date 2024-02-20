import React, { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import { LocationOn, Business, ChevronRight } from "@mui/icons-material";
import Pagination from "../pagination/Pagination";
import "../../assets/css/styles.css";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jobboard-0da3.onrender.com/api/jobs_finds"
        );
        const data = await response.json();

        const filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setJobs(filteredJobs);
        setCurrentPage(1);

        if (location.state && location.state.currentPage) {
          setCurrentPage(location.state.currentPage);
        }

        setLoading(false); // Set loading to false when jobs are loaded
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [location.state, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleGoBack = () => {
  //   navigate(-1);
  // };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to calculate the time difference for human-readable format
  const calculateTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime - postTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "just now";
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4 margin-top">Explore Job Opportunities</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, company, or location"
          value={searchQuery}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="row">
            {currentJobs.map((job) => (
              // Display the date when the job was posted
              <div key={job._id} className="col-md-6 mb-4">
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h3 className="card-title">{job.title}</h3>
                    <p className="card-subtitle mb-2 text-muted">
                      {job.company}
                    </p>
                    <p className="card-text">
                      <LocationOn /> Location: {job.location}
                    </p>
                    <p className="card-text">
                      <Business /> Type: {job.jobType}
                    </p>
                    <p className="card-text">
                      <ChevronRight /> Salary: ₹ {job.salery}
                    </p>
                    <p className="card-text">
                      <strong>Date Posted:</strong>{" "}
                      {calculateTimeDifference(job.createdAt)}
                    </p>

                    <Link
                      to={{
                        pathname: `/jobs/${job._id}`,
                        state: { currentPage },
                      }}
                      className="btn btn-primary"
                    >
                      View Details <ChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={jobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
