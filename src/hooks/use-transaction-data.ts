import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionFilters, TransactionStats, transactionApi } from '@/lib/transaction-api';

export function useTransactionData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({});

  const fetchTransactions = useCallback(async (newFilters: TransactionFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const [transactionsData, statsData] = await Promise.all([
        transactionApi.getTransactions(newFilters),
        transactionApi.getTransactionStats()
      ]);
      setTransactions(transactionsData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  }, [filters, fetchTransactions]);

  const clearFilters = useCallback(() => {
    setFilters({});
    fetchTransactions({});
  }, [fetchTransactions]);

  const refreshData = useCallback(() => {
    fetchTransactions(filters);
  }, [fetchTransactions, filters]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions(filters);
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchTransactions, filters]);

  return {
    transactions,
    stats,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refreshData
  };
}
