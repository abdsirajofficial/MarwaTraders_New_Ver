import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, total, handlePageChange }) {
  // Helper function to determine page numbers to display
  const getPageNumbers = () => {
    let pages = [];

    if (total <= 5) {
      // If there are 5 or fewer pages, show all of them
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show the first 3 pages, the last 2 pages, and the current page (if it's not already included)
      pages = [1, 2, 3, total - 1, total];

      if (currentPage > 3 && currentPage < total - 2) {
        // If the current page is not among the first 3 or last 2, include it as well
        pages.splice(3, 0, currentPage);
      }

      // Remove duplicates and sort the array
      pages = [...new Set(pages)].sort((a, b) => a - b);

      // Insert ellipses where necessary
      if (pages[2] !== pages[3] - 1) {
        pages.splice(3, 0, '...');
      }
      if (pages[pages.length - 3] !== pages[pages.length - 4] + 1) {
        pages.splice(pages.length - 2, 0, '...');
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='w-full'>
      {total <= 1 ? <div></div> :
        (<div className='flex justify-end px-10 mt-3 space-x-2'>
          {/* previous */}
          {currentPage !== 1 &&
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='flex justify-center items-center'
            >
              <ChevronLeft />
              Prev
            </button>
          }

          {/* number */}
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => page !== '...' && handlePageChange(page)}
              className={currentPage === page ? "bg-yellow-400 w-6 rounded-full" : ""}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          {/* next */}
          {currentPage !== total ?
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === total}
              className='flex justify-center items-center'
            >
              Next
              <ChevronRight />
            </button> : <div className='w-10'></div>
          }
        </div>)
      }
    </div>
  );
}
