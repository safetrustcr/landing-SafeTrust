'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TransactionSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function TransactionSearch({ 
  onSearch, 
  placeholder = "Search by hash or address...",
  className = ""
}: TransactionSearchProps) {
  const [query, setQuery] = useState('');

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-10 pr-10 h-12 w-full md:w-1/2 bg-blue-900/10 border border-blue-800/30 text-white placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-blue-600/20 text-gray-400 hover:text-white"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  );
}
