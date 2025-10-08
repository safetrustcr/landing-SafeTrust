import React from 'react';
import { cn } from '@/lib/utils';

export interface LinearProgressProps {
  value?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | string;
  className?: string;
  isIndeterminate?: boolean;
}

const colorVariants = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  purple: 'bg-purple-600',
  indigo: 'bg-indigo-600',
};

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  max = 100,
  size = 'medium',
  color = 'blue',
  className,
  isIndeterminate = false,
}) => {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2.5',
    large: 'h-4',
  };

  const containerClasses = cn(
    'w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden',
    sizeClasses[size],
    className
  );

  // Get color class or use custom color
  const getColorClass = () => {
    if (color in colorVariants) {
      return colorVariants[color as keyof typeof colorVariants];
    }
    return '';
  };

  const colorClass = getColorClass();
  const customColor = !colorClass ? color : undefined;

  if (isIndeterminate) {
    return (
      <div className={containerClasses}>
        <div className="h-full rounded-full animate-indeterminate-progress">
          <div 
            className={cn('h-full rounded-full', colorClass)}
            style={customColor ? { backgroundColor: customColor } : {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700 ease-out',
          colorClass
        )}
        style={{
          width: `${percentage}%`,
          ...(customColor && { backgroundColor: customColor }),
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      />
    </div>
  );
};
