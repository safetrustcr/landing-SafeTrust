import React from 'react';
import { LinearProgress, LinearProgressProps } from './LinearProgress';
import { CircularProgress, CircularProgressProps } from './CircularProgress';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | string;
  label?: string;
  showPercentage?: boolean;
  isIndeterminate?: boolean;
  className?: string;
  strokeWidth?: number; // For circular variant
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  variant = 'linear',
  size = 'medium',
  color = 'blue',
  label,
  showPercentage = false,
  isIndeterminate = false,
  className,
  strokeWidth,
}) => {
  const percentage = isIndeterminate ? 0 : max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const commonProps = {
    value,
    max,
    size,
    color,
    isIndeterminate,
    className: cn('mt-1', className),
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && !isIndeterminate && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
          {isIndeterminate && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          )}
        </div>
      )}
      
      {variant === 'linear' ? (
        <LinearProgress {...(commonProps as LinearProgressProps)} />
      ) : (
        <CircularProgress 
          {...(commonProps as CircularProgressProps)} 
          strokeWidth={strokeWidth}
        />
      )}
    </div>
  );
};

export default ProgressBar;
