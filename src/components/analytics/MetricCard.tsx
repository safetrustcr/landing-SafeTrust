import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MetricData, formatNumber, formatCurrency } from '@/lib/chart-utils';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: MetricData;
  index: number;
  isCurrency?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  metric, 
  index, 
  isCurrency = false 
}) => {
  const getTrendIcon = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4" />;
      case 'down':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatValue = (value: number) => {
    if (isCurrency) {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className={cn(
        "relative overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm",
        "hover:bg-slate-800/70 transition-all duration-300",
        "hover:shadow-[0_0_30px_hsl(217_91%_60%/0.2)] hover:border-blue-500/30"
      )}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-600/5 opacity-30" />
        
        <div className="relative p-6">
          {/* Header with icon and trend */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              getTrendColor(metric.trend)
            )}>
              {getTrendIcon(metric.trend)}
              <span>{Math.abs(metric.change).toFixed(1)}%</span>
            </div>
          </div>

          {/* Main value */}
          <div className="space-y-2">
            <motion.div 
              className="text-3xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              {formatValue(metric.value)}
            </motion.div>
            
            {/* Change indicator */}
            <div className={cn(
              "flex items-center gap-1 text-sm",
              getTrendColor(metric.trend)
            )}>
              <span>
                {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                {Math.abs(metric.change).toFixed(1)}% from last period
              </span>
            </div>
          </div>

          {/* Animated glow effect */}
          <motion.div
            className={cn(
              "absolute inset-0 opacity-0 pointer-events-none",
              "bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
            )}
            animate={{
              opacity: [0, 0.5, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
};