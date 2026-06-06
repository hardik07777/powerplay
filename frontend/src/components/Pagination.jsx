import React from "react";

function Pagination({
  page,
  totalPages,
  setPage,
}) {
  const getPageNumbers = () => {
    const pages = [];

    const start = Math.max(
      1,
      page - 2
    );

    const end = Math.min(
      totalPages,
      page + 2
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center p-5 border-t">

      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="w-9 h-9 border rounded-lg disabled:opacity-50"
        >
          ←
        </button>

        {getPageNumbers().map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() =>
                setPage(pageNumber)
              }
              className={`w-9 h-9 rounded-lg border ${
                page === pageNumber
                  ? "border-blue-400 text-blue-600"
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
          className="w-9 h-9 border rounded-lg disabled:opacity-50"
        >
          →
        </button>

      </div>

    </div>
  );
}

export default Pagination;