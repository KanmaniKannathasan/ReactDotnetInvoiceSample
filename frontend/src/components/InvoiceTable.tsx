import React, { useMemo, useRef, useEffect } from 'react';
import { Invoice } from '../types';

type Props = {
  invoices: Invoice[];
};

/**
 * Displays a memoized, sorted table of invoices.
 * Demonstrates useMemo for performance, useRef for DOM access, and React.memo for memoization.
 */
export const InvoiceTable: React.FC<Props> = React.memo(({ invoices }) => {
  // Memoize sorted invoices for performance
  const sorted = useMemo(() => [...invoices].sort((a, b) => a.id - b.id), [invoices]);
  // useRef to focus or scroll to the first row (demo purpose)
  const firstRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (firstRowRef.current) {
      firstRowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sorted]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((inv, i) => (
          <tr key={inv.id} ref={i === 0 ? firstRowRef : undefined}>
            <td>{inv.id}</td>
            <td>{inv.customer}</td>
            <td>{inv.amount}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
