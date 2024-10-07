import { useContext } from "react";
import { PaginationContext } from "../store/paginationStore";

const Pagination = () => {
  const { state, dispatchData } = useContext(PaginationContext);
  const { currentPage, isLoading } = state;

  const handlePageChange = (page) => {
    if (page >= 1 && page !== currentPage) {
      dispatchData({
        type: "SET_PAGE",
        payload: { currentPage: page },
      });
    }
  };

  return (
    <div className="pagination-controls">
      <div className="controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="arrow-button"
        >
          &#10094;
        </button>
        {Array.from({ length: 4 }, (item, index) => {
          const startPage = Math.max(currentPage - 2, 1);
          return startPage + index;
        }).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`page-number ${page === currentPage ? "current" : ""}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLoading}
          className="arrow-button"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
