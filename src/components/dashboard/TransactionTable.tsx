'use client';

import { useState } from 'react';
import { Transaction } from '@/lib/transaction-api';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  className?: string;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-800 border-green-200' },
  failed: { label: 'Failed', className: 'bg-red-100 text-red-800 border-red-200' }
} as const;

export function TransactionTable({ 
  transactions, 
  loading = false,
  className = ""
}: TransactionTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(4)} ETH`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 animate-pulse">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-6 w-6 bg-blue-800/30 rounded"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-6 bg-blue-800/30 rounded w-24"></div>
                      <div className="h-5 bg-blue-800/30 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-blue-800/30 rounded w-32"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-8 w-8 bg-blue-800/30 rounded"></div>
                  <div className="h-8 w-8 bg-blue-800/30 rounded"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">No transactions found</div>
          <div className="text-sm">Try adjusting your search or filters</div>
        </div>
      </Card>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {transactions.map((transaction) => {
        const isExpanded = expandedRows.has(transaction.id);
        const statusInfo = statusConfig[transaction.status];

        return (
          <Card key={transaction.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-transparent hover:border-l-[#336AD9] bg-blue-900/10 backdrop-blur-sm border border-blue-800/30">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(transaction.id)}
                    className="p-1 h-6 w-6"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {formatAddress(transaction.hash)}
                      </code>
                      <Badge className={cn("text-xs", statusInfo.className)}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatTimestamp(transaction.timestamp)} • {formatAmount(transaction.amount)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.hash)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">From Address</div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded flex-1">
                          {transaction.fromAddress}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(transaction.fromAddress)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">To Address</div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded flex-1">
                          {transaction.toAddress}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(transaction.toAddress)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Transaction ID</div>
                      <div className="font-mono text-white">{transaction.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Amount</div>
                      <div className="font-medium text-white">{formatAmount(transaction.amount)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Full Timestamp</div>
                      <div className="text-xs">
                        {transaction.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
