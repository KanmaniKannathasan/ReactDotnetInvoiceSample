import React, { useState } from 'react';
// Custom hook for fetching paginated invoices from API
import { useFetchInvoices } from '../hooks/useFetchInvoices';
// Table component to display invoice data
import { InvoiceTable } from '../components/InvoiceTable';
// Pagination component for page navigation
import { Pagination } from '../components/Pagination';

const PER_PAGE = 10; // Number of invoices per page

// Main page component for displaying invoices
export const InvoicesPage: React.FC = () => {
  // State for current page number
  const [page, setPage] = useState(1);

  // Custom hook returns data, total count, loading and error states
  const { data, total, loading, error } = useFetchInvoices(page, PER_PAGE);

  return (
    <div>
      <h1>Invoices</h1>
      {/* Show loading spinner while fetching data */}
      {loading && <p>Loading...</p>}
      {/* Show error message if API call fails */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {/* Show empty state if no invoices are found */}
      {!loading && data.length === 0 && <p>No invoices found.</p>}
      {/* Show table and pagination when data is available */}
      {!loading && data.length > 0 && (
        <>
          {/* InvoiceTable receives invoice data as props */}
          <InvoiceTable invoices={data} />
          {/* Pagination receives current page, page size, total count, and page change handler */}
          <Pagination
            page={page}
            perPage={PER_PAGE}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
