import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, BarChart3, LineChart as LineChartIcon, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalyticsData, ChartConfig, chartConfigs, exportToCSV, formatNumber, formatCurrency } from '@/lib/chart-utils';
import { cn } from '@/lib/utils';

type ChartType = 'line' | 'bar' | 'area';

interface ChartContainerProps {
  data: AnalyticsData[];
  title: string;
  description?: string;
  defaultType?: ChartType;
  height?: number;
  showExport?: boolean;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg"
    >
      <p className="text-sm font-medium text-white mb-2">
        {new Date(label!).toLocaleDateString()}
      </p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-white">
            {entry.dataKey === 'volume' 
              ? formatCurrency(entry.value) 
              : formatNumber(entry.value)
            }
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export const ChartContainer: React.FC<ChartContainerProps> = ({
  data,
  title,
  description,
  defaultType = 'line',
  height = 400,
  showExport = true,
  className
}) => {
  const [chartType, setChartType] = useState<ChartType>(defaultType);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['transactions', 'volume']);

  const handleExport = () => {
    exportToCSV(data, `${title.toLowerCase().replace(/\s+/g, '-')}-chart-data`);
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const getChartConfig = (): ChartConfig[] => {
    const configs = chartConfigs[chartType] || chartConfigs.line;
    return configs.filter(config => selectedMetrics.includes(config.dataKey));
  };

  const renderChart = () => {
    const config = getChartConfig();
    
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    const commonElements = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={formatNumber}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </>
    );

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonElements}
            {config.map((item, index) => (
              <Bar
                key={item.dataKey}
                dataKey={item.dataKey}
                name={item.label}
                fill={item.color}
                fillOpacity={item.fillOpacity}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {commonElements}
            {config.map((item, index) => (
              <Area
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey}
                name={item.label}
                stroke={item.color}
                fill={item.color}
                fillOpacity={item.fillOpacity}
                strokeWidth={item.strokeWidth}
              />
            ))}
          </AreaChart>
        );
      
      default: // line
        return (
          <LineChart {...commonProps}>
            {commonElements}
            {config.map((item, index) => (
              <Line
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey}
                name={item.label}
                stroke={item.color}
                strokeWidth={item.strokeWidth}
                dot={{ fill: item.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: item.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  const chartTypeButtons = [
    { type: 'line' as ChartType, icon: LineChartIcon, label: 'Line' },
    { type: 'bar' as ChartType, icon: BarChart3, label: 'Bar' },
    { type: 'area' as ChartType, icon: TrendingUp, label: 'Area' },
  ];

  const metricButtons = [
    { key: 'transactions', label: 'Transactions', color: '#3b82f6' },
    { key: 'volume', label: 'Volume', color: '#10b981' },
    { key: 'users', label: 'Users', color: '#f59e0b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Chart Type Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700">
                {chartTypeButtons.map(({ type, icon: Icon, label }) => (
                  <Button
                    key={type}
                    variant={chartType === type ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartType(type)}
                    className={cn(
                      "h-8 px-3 text-white",
                      chartType === type && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">{label}</span>
                  </Button>
                ))}
              </div>

              {/* Export Button */}
              {showExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="border-slate-700 hover:border-blue-500/30"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Export</span>
                </Button>
              )}
            </div>
          </div>

          {/* Metric Toggles */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground mr-2">Show:</span>
            {metricButtons.map(({ key, label, color }) => (
              <Button
                key={key}
                variant={selectedMetrics.includes(key) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric(key)}
                className={cn(
                  "h-7 text-xs border-slate-700",
                  selectedMetrics.includes(key) && "bg-primary text-primary-foreground"
                )}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-1.5" 
                  style={{ backgroundColor: color, color: "white" }}
                />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={chartType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height }}
            >
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};