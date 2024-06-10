// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex justify-center mt-4">
        <button
          className="px-2 py-1 mx-1 bg-gray-200 rounded"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {pages.map(page => (
          <button
            key={page}
            className={`px-2 rounded-md py-1 mx-1 ${page === currentPage ? 'bg-[#5f59f7] text-white' : 'bg-gray-200'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-2 py-1 mx-1 bg-gray-200 rounded"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;