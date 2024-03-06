import React from "react";
import { Pagination as MuiPagination, PaginationItem } from "@mui/material";

const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <MuiPagination
        page={currentPage}
        count={Math.ceil(totalJobs / jobsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => paginate(page)}
        sx={{ justifyContent: 'center', mt: 2 }}
        renderItem={(item) => (
          <PaginationItem
            component="li"
            page={item.page}
            disabled={item.disabled}
            onClick={() => paginate(item.page)}
            {...item}
          />
        )}
      />
    </nav>
  );
};

export default Pagination;
