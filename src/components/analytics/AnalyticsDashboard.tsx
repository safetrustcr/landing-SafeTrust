"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Calendar, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MetricCard } from './MetricCard';
import { ChartContainer } from './ChartContainer';
import { DateRangePicker } from './DateRangePicker';
import { useAnalyticsData } from '@/hooks/use-analytics-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DateRange {
  start: Date;
  end: Date;
}

export const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  });

  const { data, metrics, isLoading, error, refetch } = useAnalyticsData({
    dateRange,
    refreshInterval: 60000, // Refresh every minute
  });


  const handleRefresh = () => {
    refetch();
    toast.success("Data Refreshed", {
      description: "Analytics data has been updated successfully.",
    });
  };

  const handleDateRangeChange = (newRange: DateRange | null) => {
    setDateRange(newRange);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="p-8 border-destructive/20 bg-destructive/5">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Analytics</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute top-3/4 right-1/3 w-32 h-32 bg-blue-500/8 rounded-full blur-xl" />
      </div>

      <div className="relative z-10  mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col min-[671px]:flex-row min-[671px]:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Real-time insights into your platform's performance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <DateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              className="w-full sm:w-auto"
            />
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className={cn(
                "border-slate-700 hover:border-blue-500/30 w-full sm:w-auto",
                isLoading && "opacity-50"
              )}
            >
              <RefreshCw
                className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")}
              />
              Refresh
            </Button>
          </div>
        </motion.div>


        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 border-slate-700 bg-slate-800/30">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-20"></div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Metrics Grid */}
        {!isLoading && metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={index}
                isCurrency={metric.label.includes('Volume') || metric.label.includes('Avg')}
              />
            ))}
          </div>
        )}

        {/* Charts Section */}
        {!isLoading && data.length > 0 && (
          <div className="space-y-8 text-white">
            {/* Main Chart */}
            <ChartContainer
              data={data}
              title="Transaction Overview"
              description="Interactive visualization of platform activity over time"
              defaultType="line"
              height={450}
              showExport={true}
            />

            {/* Secondary Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                data={data}
                title="Volume Analysis"
                description="Financial volume trends"
                defaultType="area"
                height={350}
                showExport={false}
              />

              <ChartContainer
                data={data}
                title="User Activity"
                description="Platform user engagement metrics"
                defaultType="bar"
                height={350}
                showExport={false}
              />
            </div>
          </div>
        )}

        {/* Real-time Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6"
        >
          <Card className="p-3 border-slate-700 bg-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-xs text-muted-foreground">Live Data</span>
            </div>
          </Card>
        </motion.div>

        {/* Empty State */}
        {!isLoading && data.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Card className="p-12 border-slate-700 bg-slate-800/30 max-w-md mx-auto">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Data Available
              </h3>
              <p className="text-muted-foreground mb-6">
                Select a different date range or check back later for analytics data.
              </p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};