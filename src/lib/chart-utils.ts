export interface AnalyticsData {
  date: string;
  transactions: number;
  volume: number;
  users: number;
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

export interface ChartConfig {
  dataKey: string;
  label: string;
  color: string;
  strokeWidth?: number;
  fillOpacity?: number;
}

// Generate mock analytics data for demonstration
export const generateMockData = (days: number = 30): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate realistic trending data with some variance
    const baseTransactions = 1000 + (i * 20) + Math.random() * 200;
    const baseVolume = 50000 + (i * 1000) + Math.random() * 10000;
    const baseUsers = 500 + (i * 10) + Math.random() * 100;

    data.push({
      date: date.toISOString().split('T')[0],
      transactions: Math.floor(baseTransactions),
      volume: Math.floor(baseVolume),
      users: Math.floor(baseUsers),
    });
  }

  return data;
};

// Calculate percentage change between two values
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Format large numbers with appropriate suffixes
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Format currency values
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

// Default chart configurations
export const chartConfigs: Record<string, ChartConfig[]> = {
  line: [
    { dataKey: 'transactions', label: 'Transactions', color: '#3b82f6', strokeWidth: 3 },
    { dataKey: 'volume', label: 'Volume ($)', color: '#22c55e', strokeWidth: 3 },         
    { dataKey: 'users', label: 'Users', color: '#f59e0b', strokeWidth: 3 },               
  ],
  bar: [
    { dataKey: 'transactions', label: 'Transactions', color: '#3b82f6', fillOpacity: 0.8 },
    { dataKey: 'volume', label: 'Volume ($)', color: '#22c55e', fillOpacity: 0.8 },         
    { dataKey: 'users', label: 'Users', color: '#f59e0b', fillOpacity: 0.8 },               
  ],
  area: [
    { dataKey: 'transactions', label: 'Transactions', color: '#3b82f6', fillOpacity: 0.3 },
    { dataKey: 'volume', label: 'Volume ($)', color: '#22c55e', fillOpacity: 0.3 },         
    { dataKey: 'users', label: 'Users', color: '#f59e0b', fillOpacity: 0.3 },               
  ],
};

// Export chart data as CSV
export const exportToCSV = (data: AnalyticsData[], filename: string = 'analytics-data') => {
  const headers = ['Date', 'Transactions', 'Volume', 'Users'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      row.date,
      row.transactions,
      row.volume,
      row.users
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Date range presets
export const dateRangePresets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 6 months', days: 180 },
  { label: 'Last year', days: 365 },
];