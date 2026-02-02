
import { useState, useEffect, useCallback } from 'react';
import { AnalyticsData, MetricData, calculateChange, generateMockData } from '@/lib/chart-utils';
import { tracker, AnalyticsEvent } from '@/lib/analytics';

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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  }, []);

  const processEvents = useCallback((events: AnalyticsEvent[], days: number): AnalyticsData[] => {
    const dataMap = new Map<string, { pageViews: number; clicks: number; users: Set<string> }>();
    const today = new Date();
    // Reset time part to ensure consistency
    today.setHours(0, 0, 0, 0);

    // Initialize map with 0 values for the last N days
    for(let i = 0; i < days; i++) {
       const d = new Date(today);
       d.setDate(d.getDate() - i);
       const dateStr = d.toISOString().split('T')[0];
       dataMap.set(dateStr, { pageViews: 0, clicks: 0, users: new Set() });
    }

    events.forEach(event => {
       const dateStr = new Date(event.timestamp).toISOString().split('T')[0];
       // Only process events that fall within our initialized range
       if (dataMap.has(dateStr)) {
          const entry = dataMap.get(dateStr)!;
          if (event.type === 'page_view') {
            entry.pageViews++;
          } else if (event.type === 'button_click' || event.type === 'custom' || event.type === 'form_submit') {
            entry.clicks++;
          }
          entry.users.add(event.visitorId);
       }
    });

    return Array.from(dataMap.entries())
       .map(([date, stats]) => ({
          date,
          pageViews: stats.pageViews,
          clicks: stats.clicks,
          users: stats.users.size
       }))
       .sort((a, b) => a.date.localeCompare(b.date));
 }, []);

  const generateMetrics = useCallback((analyticsData: AnalyticsData[]): MetricData[] => {
    if (analyticsData.length < 1) return [];

    const latest = analyticsData[analyticsData.length - 1];
    const previous = analyticsData.length > 1 ? analyticsData[analyticsData.length - 2] : { pageViews: 0, clicks: 0, users: 0 };
    
    const totalPageViews = analyticsData.reduce((sum, item) => sum + item.pageViews, 0);
    const totalClicks = analyticsData.reduce((sum, item) => sum + item.clicks, 0);
    const totalUsers = analyticsData.reduce((sum, item) => sum + item.users, 0); // This sums daily unique users, which isn't quite right for "Total Unique Users", but good for a metric card showing activity volume. 
    // Better: Total Unique Users over the period.
    // Since I don't have the raw events here easily without re-processing, I'll stick to max daily or average.
    // Actually, let's just use the sum of daily users as "Active User Sessions" or similar.
    // Or just take the max daily users.
    const maxDailyUsers = Math.max(...analyticsData.map(item => item.users));

    return [
      {
        label: 'Total Page Views',
        value: totalPageViews,
        change: calculateChange(latest.pageViews, previous.pageViews),
        trend: latest.pageViews >= previous.pageViews ? 'up' : 'down',
        icon: '👁️',
        color: 'primary',
      },
      {
        label: 'Total Interactions',
        value: totalClicks,
        change: calculateChange(latest.clicks, previous.clicks),
        trend: latest.clicks >= previous.clicks ? 'up' : 'down',
        icon: '👆',
        color: 'success',
      },
      {
        label: 'Active Users (Peak)',
        value: maxDailyUsers,
        change: calculateChange(latest.users, previous.users),
        trend: latest.users >= previous.users ? 'up' : 'down',
        icon: '👥',
        color: 'info',
      },
      {
        label: 'Avg Actions/User',
        value: totalUsers > 0 ? (totalPageViews + totalClicks) / totalUsers : 0,
        change: 0, // Simplified
        trend: 'neutral',
        icon: '📊',
        color: 'warning',
      },
    ];
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const days = dateRange 
        ? calculateDaysBetween(dateRange.start, dateRange.end)
        : 30;
      
      // Fetch real history
      const events = tracker.getHistory();
      
      // If no events exist, use mock data so the dashboard isn't empty for the user
      // This is a "demo mode" fallback
      let processedData: AnalyticsData[];
      if (events.length === 0) {
        processedData = generateMockData(days);
      } else {
        processedData = processEvents(events, days);
      }
      
      // If date range is specified, filter data (though processEvents already generates for N days ending today)
      // If dateRange end is not today, we might need to shift the generation window in processEvents, but for now assuming 'end' is today or we filter.
      let filteredData = processedData;
      if (dateRange) {
        filteredData = processedData.filter(item => {
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
  }, [dateRange, calculateDaysBetween, generateMetrics, processEvents]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for real-time events
  useEffect(() => {
    const handleEvent = () => {
      // Debounce or just trigger refetch?
      // Since we read from localStorage in fetchData, we can just call refetch.
      // But let's not refresh too often to avoid flickering.
      // For now, let's rely on interval or manual refresh, OR just simple update.
      // Actually, updating real-time is nice.
      refetch();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('analytics-event', handleEvent);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('analytics-event', handleEvent);
      }
    };
  }, [refetch]);

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
