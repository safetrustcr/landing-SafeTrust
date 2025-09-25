'use client';

import { useState, useCallback } from 'react';
import { Download, RefreshCw, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TransactionTable } from './TransactionTable';
import { TransactionSearch } from './TransactionSearch';
import { TransactionFilters } from './TransactionFilters';
import { useTransactionData } from '@/hooks/use-transaction-data';
import { transactionApi, TransactionFilters as FilterType } from '@/lib/transaction-api';

export function TransactionDashboard() {
  const {
    transactions,
    stats,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refreshData
  } = useTransactionData();

  const [isExporting, setIsExporting] = useState(false);

  const handleSearch = useCallback((query: string) => {
    updateFilters({ search: query || undefined });
  }, [updateFilters]);

  const handleFiltersChange = useCallback((newFilters: Partial<FilterType>) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  const handleExportCSV = useCallback(async () => {
    if (!transactions.length) return;
    
    setIsExporting(true);
    try {
      const csvContent = await transactionApi.exportToCSV(transactions);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, [transactions]);

  const handleExportPDF = useCallback(async () => {
    if (!transactions.length) return;
    
    setIsExporting(true);
    try {
      const htmlBlob = await transactionApi.exportToPDF(transactions);
      const url = URL.createObjectURL(htmlBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safetrust-transactions-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, [transactions]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a15] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Card className="p-8 text-center">
            <div className="text-destructive mb-4">
              <XCircle className="h-12 w-12 mx-auto mb-2" />
              <div className="text-lg font-medium">Error loading transactions</div>
              <div className="text-sm text-muted-foreground mb-4">{error}</div>
              <Button onClick={refreshData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#336AD9] to-blue-600 bg-clip-text text-transparent">
            Transaction Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Monitor and manage your blockchain transactions
          </p>
        </div>
        
        <div className="flex flex-row items-center gap-2 mt-4 lg:mt-0">
          <Button
            variant="outline"
            onClick={refreshData}
            disabled={loading}
            className="flex items-center justify-center gap-2 border-blue-700/40 text-gray-400 bg-blue-900/10 hover:bg-blue-900/20 hover:text-gray-300 transition-all duration-300 flex-1"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={!transactions.length || isExporting}
            className="flex items-center justify-center gap-2 border-blue-700/40 text-gray-400 bg-blue-900/10 hover:bg-blue-900/20 hover:text-gray-300 transition-all duration-300 flex-1"
          >
            <Download className="h-4 w-4" />
            CSV
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            disabled={!transactions.length || isExporting}
            className="flex items-center justify-center gap-2 border-blue-700/40 text-gray-400 bg-blue-900/10 hover:bg-blue-900/20 hover:text-gray-300 transition-all duration-300 flex-1"
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {loading && !stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4 bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-8 bg-blue-800/30 rounded w-12 mb-2"></div>
                  <div className="h-4 bg-blue-800/30 rounded w-24"></div>
                </div>
                <div className="h-8 w-8 bg-blue-800/30 rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4 border-l-4 border-l-[#336AD9] bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg md:text-2xl font-bold text-blue-400">{stats.total}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">Total Transactions</div>
              </div>
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-400 flex-shrink-0" />
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 border-l-4 border-l-yellow-500 bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg md:text-2xl font-bold text-yellow-400">{stats.pending}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">Pending</div>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 flex-shrink-0" />
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 border-l-4 border-l-green-500 bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg md:text-2xl font-bold text-green-400">{stats.completed}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">Completed</div>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-400 flex-shrink-0" />
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 border-l-4 border-l-red-500 bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg md:text-2xl font-bold text-red-400">{stats.failed}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">Failed</div>
              </div>
              <XCircle className="h-6 w-6 md:h-8 md:w-8 text-red-400 flex-shrink-0" />
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <TransactionSearch
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
        </div>
        
        <TransactionFilters
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
          activeFilters={filters}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Transactions</h2>
            <Badge className="bg-secondary text-secondary-foreground">
              {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
            </Badge>
          </div>
        </div>
        
        <TransactionTable
          transactions={transactions}
          loading={loading}
        />
      </div>
      </div>
    </div>
  );
}
