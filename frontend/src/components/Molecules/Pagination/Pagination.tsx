import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        disabled={currentPage === i}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>,
    );
  }

  return (
    <nav>
      <ul>{pages}</ul>
    </nav>
  );
};

export default Pagination;
