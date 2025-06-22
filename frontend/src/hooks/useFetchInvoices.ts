import { useReducer, useEffect } from 'react';
import { fetchInvoices } from '../api/mockApi';
import { Invoice } from '../types';

// State type for the hook
type State = {
  loading: boolean;
  error: string | null;
  data: Invoice[];
  total: number;
};

// Action types for reducer
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { data: Invoice[]; total: number } }
  | { type: 'FETCH_ERROR'; payload: string };

// Initial state for reducer
const initialState: State = {
  loading: false,
  error: null,
  data: [],
  total: 0,
};

// Reducer function to manage fetch state
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload.data, total: action.payload.total };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

/**
 * Custom hook to fetch paginated invoices.
 * Handles loading, error, and cancellation.
 * @param page Current page number
 * @param perPage Number of invoices per page
 */
export function useFetchInvoices(page: number, perPage: number) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'FETCH_START' });

    // Fetch invoices from API
    fetchInvoices(page, perPage)
      .then((res) => {
        if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: res });
      })
      .catch((err) => {
        if (!cancelled) dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Unknown error' });
      });

    // Cleanup to prevent state updates on unmounted component
    return () => {
      cancelled = true;
    };
  }, [page, perPage]);

  return state;
}
