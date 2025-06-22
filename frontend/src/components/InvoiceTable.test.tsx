import { render, screen } from '@testing-library/react';
import { InvoiceTable } from './InvoiceTable';

const mockInvoices = [
  { id: 1, customer: 'Customer 1', amount: 100, status: 'paid' },
  { id: 2, customer: 'Customer 2', amount: 200, status: 'pending' },
];

test('renders invoice table with data', () => {
  render(<InvoiceTable invoices={mockInvoices} />);
  expect(screen.getByText('Customer 1')).toBeInTheDocument();
  expect(screen.getByText('Customer 2')).toBeInTheDocument();
  expect(screen.getByText('paid')).toBeInTheDocument();
  expect(screen.getByText('pending')).toBeInTheDocument();
});