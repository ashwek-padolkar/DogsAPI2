import { useGlobalContextPagination } from "../store/paginationStore";

const Pagination = () => {
  const { currentPage, dispatchData } = useGlobalContextPagination();

  const handlePageChange = (page) => {
    if (page >= 1) {
      dispatchData({
        type: "SET_PAGE",
        payload: { currentPage: page },
      });
    }
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
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
          className={`page-number ${page === currentPage ? "current" : ""}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="arrow-button"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Pagination;
