import { useState, useEffect, useCallback } from 'react';
import { AnalyticsData, MetricData, generateMockData, calculateChange } from '@/lib/chart-utils';

interface UseAnalyticsDataOptions {
  dateRange: { start: Date; end: Date } | null;
  refreshInterval?: number;
}

interface UseAnalyticsDataReturn {
  data: AnalyticsData[];
  metrics: MetricData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useAnalyticsData = ({ 
  dateRange, 
  refreshInterval = 60000 // 1 minute default
}: UseAnalyticsDataOptions): UseAnalyticsDataReturn => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateDaysBetween = useCallback((start: Date, end: Date): number => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const generateMetrics = useCallback((analyticsData: AnalyticsData[]): MetricData[] => {
    if (analyticsData.length < 2) return [];

    const latest = analyticsData[analyticsData.length - 1];
    const previous = analyticsData[analyticsData.length - 2];
    
    // Calculate total volume for the period
    const totalVolume = analyticsData.reduce((sum, item) => sum + item.volume, 0);
    const totalTransactions = analyticsData.reduce((sum, item) => sum + item.transactions, 0);
    const totalUsers = Math.max(...analyticsData.map(item => item.users));

    return [
      {
        label: 'Total Volume',
        value: totalVolume,
        change: calculateChange(latest.volume, previous.volume),
        trend: latest.volume > previous.volume ? 'up' : latest.volume < previous.volume ? 'down' : 'neutral',
        icon: '💰',
        color: 'primary',
      },
      {
        label: 'Transactions',
        value: totalTransactions,
        change: calculateChange(latest.transactions, previous.transactions),
        trend: latest.transactions > previous.transactions ? 'up' : latest.transactions < previous.transactions ? 'down' : 'neutral',
        icon: '📊',
        color: 'success',
      },
      {
        label: 'Active Users',
        value: totalUsers,
        change: calculateChange(latest.users, previous.users),
        trend: latest.users > previous.users ? 'up' : latest.users < previous.users ? 'down' : 'neutral',
        icon: '👥',
        color: 'info',
      },
      {
        label: 'Avg Transaction',
        value: totalVolume / totalTransactions,
        change: calculateChange(
          latest.volume / latest.transactions,
          previous.volume / previous.transactions
        ),
        trend: (latest.volume / latest.transactions) > (previous.volume / previous.transactions) ? 'up' : 'down',
        icon: '📈',
        color: 'warning',
      },
    ];
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate days for data generation
      const days = dateRange 
        ? calculateDaysBetween(dateRange.start, dateRange.end)
        : 30;
      
      const newData = generateMockData(days);
      
      // If date range is specified, filter data
      let filteredData = newData;
      if (dateRange) {
        filteredData = newData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= dateRange.start && itemDate <= dateRange.end;
        });
      }
      
      setData(filteredData);
      setMetrics(generateMetrics(filteredData));
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Analytics data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, calculateDaysBetween, generateMetrics]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up automatic refresh
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return {
    data,
    metrics,
    isLoading,
    error,
    refetch,
  };
};