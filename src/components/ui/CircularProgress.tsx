import React from 'react';
import { cn } from '@/lib/utils';

export interface CircularProgressProps {
  value?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | string;
  className?: string;
  isIndeterminate?: boolean;
  strokeWidth?: number;
}

const colorVariants = {
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  yellow: '#f59e0b',
  purple: '#8b5cf6',
  indigo: '#6366f1',
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  max = 100,
  size = 'medium',
  color = 'blue',
  className,
  isIndeterminate = false,
  strokeWidth,
}) => {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const sizeMap = {
    small: { diameter: 40, defaultStroke: 3 },
    medium: { diameter: 80, defaultStroke: 4 },
    large: { diameter: 120, defaultStroke: 6 },
  };

  const { diameter, defaultStroke } = sizeMap[size];
  const stroke = strokeWidth || defaultStroke;
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Get color value
  const getColorValue = () => {
    if (color in colorVariants) {
      return colorVariants[color as keyof typeof colorVariants];
    }
    return color;
  };

  const colorValue = getColorValue();

  const containerClasses = cn(
    'relative inline-flex items-center justify-center',
    className
  );

  if (isIndeterminate) {
    return (
      <div 
        className={containerClasses} 
        style={{ width: diameter, height: diameter }}
      >
        <svg 
          className="animate-spin" 
          width={diameter} 
          height={diameter}
        >
          <circle
            className="opacity-25"
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            className="opacity-75"
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={colorValue}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            strokeLinecap="round"
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={containerClasses} 
      style={{ width: diameter, height: diameter }}
    >
      <svg width={diameter} height={diameter}>
        {/* Background circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={colorValue}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ 
            transform: 'rotate(-90deg)', 
            transformOrigin: 'center'
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progress: ${Math.round(percentage)}%`}
        />
      </svg>
      
      {/* Center text showing percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};
