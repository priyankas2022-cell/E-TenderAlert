import React from 'react';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          border: '1px solid #e2e8f0',
          backgroundColor: currentPage === 1 ? '#f8fafc' : 'white',
          color: currentPage === 1 ? '#94a3b8' : '#64748b',
          borderRadius: '6px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <i className="fas fa-chevron-left"></i>
        Prev
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          style={{
            padding: '8px 12px',
            border: '1px solid #e2e8f0',
            backgroundColor: page === currentPage ? '#3b82f6' : 'white',
            color: page === currentPage ? 'white' : (page === '...' ? '#94a3b8' : '#64748b'),
            borderRadius: '6px',
            cursor: page === '...' ? 'default' : 'pointer',
            fontSize: '0.875rem',
            minWidth: '36px',
            textAlign: 'center'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          border: '1px solid #e2e8f0',
          backgroundColor: currentPage === totalPages ? '#f8fafc' : 'white',
          color: currentPage === totalPages ? '#94a3b8' : '#64748b',
          borderRadius: '6px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        Next
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default PaginationControls;