import React from 'react';

interface Props {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, perPage, total, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  return (
    <div style={{ margin: '1rem 0' }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          disabled={page === i + 1}
          style={{ margin: '0 4px' }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
