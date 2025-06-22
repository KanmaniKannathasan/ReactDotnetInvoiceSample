export type Invoice = {
  id: number;
  customer: string;
  amount: number;
  status: 'overdue' | 'paid' | 'pending';
};
