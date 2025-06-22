import { Invoice } from '../types';

export const fetchInvoices = async (page = 1, perPage = 10): Promise<{ data: Invoice[]; total: number }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 57;
      const data = Array.from({ length: Math.min(perPage, total - (page - 1) * perPage) }, (_, i) => {
        const id = (page - 1) * perPage + i + 1;
        return {
          id,
          customer: `Customer ${id}`,
          amount: Math.floor(Math.random() * 1000),
          status: id % 3 === 0 ? 'overdue' : id % 3 === 1 ? 'paid' : 'pending',
        };
      });
      resolve({ data, total });
    }, 500);
  });
};
