import React from "react";

// Función auxiliar para generar números de página con elipsis
const getPageNumbers = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let start = Math.max(1, currentPage - delta);
  let end = Math.min(totalPages, currentPage + delta);

  if (end - start < 2 * delta) {
    if (currentPage < totalPages - delta)
      end = Math.min(start + 2 * delta, totalPages);
    else start = Math.max(end - 2 * delta, 1);
  }

  for (let i = start; i <= end; i++) range.push(i);

  if (start > 1) rangeWithDots.push(1, "...");
  rangeWithDots.push(...range);
  if (end < totalPages) rangeWithDots.push("...", totalPages);

  return rangeWithDots;
};

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  // Manejar cambio de página con validación
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 font-sans flex-wrap">
      {/* Boton anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-w-[110px] px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg
         shadow-md hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed 
         transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        arial-label="Página anterior"
      >
        <svg
          className="w-5 h-5 inline-block mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Anterior
      </button>

      {/* Números de pagina */}
      <div className="flex gap-1">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={` px-4 py-2 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                currentPage === page
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              }`}
              arial-label={`Página ${page}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-w-[110px] px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:from-indigo-700
        hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        arial-label="Página siguiente"
      >
        Siguiente
        <svg
          className="w-5 h-5 inline-block ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
