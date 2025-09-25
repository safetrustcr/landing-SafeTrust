'use client';

import { useState, useCallback } from 'react';
import { Filter, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TransactionFilters as FilterType } from '@/lib/transaction-api';

interface TransactionFiltersProps {
  onFiltersChange: (filters: Partial<FilterType>) => void;
  onClearFilters: () => void;
  activeFilters: FilterType;
  className?: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' }
] as const;

export function TransactionFilters({ 
  onFiltersChange, 
  onClearFilters, 
  activeFilters,
  className = ""
}: TransactionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleStatusFilter = useCallback((status: 'pending' | 'completed' | 'failed') => {
    onFiltersChange({ 
      status: activeFilters.status === status ? undefined : status 
    });
  }, [onFiltersChange, activeFilters.status]);

  const handleDateFilter = useCallback(() => {
    const filters: Partial<FilterType> = {};
    if (dateFrom) filters.dateFrom = new Date(dateFrom);
    if (dateTo) filters.dateTo = new Date(dateTo);
    onFiltersChange(filters);
  }, [dateFrom, dateTo, onFiltersChange]);

  const clearDateFilters = useCallback(() => {
    setDateFrom('');
    setDateTo('');
    onFiltersChange({ dateFrom: undefined, dateTo: undefined });
  }, [onFiltersChange]);

  const hasActiveFilters = activeFilters.status || activeFilters.dateFrom || activeFilters.dateTo;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
          {hasActiveFilters && (
            <Badge className="bg-secondary text-secondary-foreground ml-2">
              {[activeFilters.status, activeFilters.dateFrom, activeFilters.dateTo].filter(Boolean).length}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeFilters.status === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusFilter(option.value)}
            className={`transition-colors flex-1 sm:flex-none ${
              activeFilters.status === option.value 
                ? option.color 
                : 'border-blue-700/40 text-gray-400 bg-blue-900/10 hover:bg-blue-900/20 hover:text-gray-300'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {isExpanded && (
        <Card className="p-4 space-y-4 bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Date Range
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400">From</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="text-sm bg-blue-900/10 border border-blue-800/30 text-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400">To</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="text-sm bg-blue-900/10 border border-blue-800/30 text-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                onClick={handleDateFilter}
                disabled={!dateFrom && !dateTo}
                className="bg-blue-900/15 hover:bg-blue-900/25 text-gray-400 hover:text-gray-300 border border-blue-700/40 w-full sm:w-auto"
              >
                Apply Date Filter
              </Button>
              {(dateFrom || dateTo) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearDateFilters}
                  className="border-blue-700/40 text-gray-400 bg-blue-900/10 hover:bg-blue-900/20 hover:text-gray-300 w-full sm:w-auto"
                >
                  Clear Dates
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
