import React from "react";

const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination d-flex justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => paginate(currentPage - 1, currentPage)}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              onClick={() => paginate(number, currentPage)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === Math.ceil(totalJobs / jobsPerPage) ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage + 1, currentPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
