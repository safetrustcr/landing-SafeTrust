"use client";

import { useState } from "react";
import { Transaction } from "@/lib/transaction-api";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 border-red-200",
  },
} as const;

export function TransactionTable({
  transactions,
  loading = false,
  className = "",
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
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(4)} ETH`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 animate-pulse"
          >
            <div className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="h-6 w-6 bg-blue-800/30 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <div className="h-6 bg-blue-800/30 rounded w-24"></div>
                      <div className="h-5 bg-blue-800/30 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-blue-800/30 rounded w-32"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
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
          <Card
            key={transaction.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-[#336AD9] bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 cursor-pointer"
            onClick={() => toggleRow(transaction.id)}
          >
            <div className="p-4 md:p-6">
              {/* Clean mobile layout */}
              <div className="space-y-4 md:space-y-0">
                {/* Header with hash and actions */}
                <div className="flex items-start justify-between gap-3 md:items-center">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                      Transaction
                    </div>
                    <code className="text-sm font-mono text-gray-200 break-all leading-relaxed">
                      {formatAddress(transaction.hash)}
                    </code>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(transaction.hash);
                      }}
                      className="h-9 w-9 p-0 hover:bg-blue-800/20 rounded-lg"
                      title="Copy transaction hash"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      className="h-9 w-9 p-0 hover:bg-blue-800/20 rounded-lg"
                      title="View on blockchain explorer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Info cards - Mobile: stacked, Desktop: inline */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <Badge
                      className={cn("text-xs px-2 py-1", statusInfo.className)}
                    >
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
                    <div className="text-xs text-gray-400 mb-1">Amount</div>
                    <div className="font-bold text-blue-400 text-lg">
                      {formatAmount(transaction.amount)}
                    </div>
                  </div>

                  {/* Time card - Mobile: full width, Desktop: inline */}
                  <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30 col-span-2 md:col-span-1">
                    <div className="text-xs text-gray-400 mb-1">Time</div>
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <Clock className="h-4 w-4 text-blue-400" />
                      {formatTimestamp(transaction.timestamp)}
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-blue-800/30 space-y-6">
                  {/* Address Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      Transaction Details
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          From Address
                        </div>
                        <div className="flex items-start gap-2">
                          <code className="text-xs font-mono bg-blue-900/20 px-3 py-2 rounded-md flex-1 break-all text-gray-200 border border-blue-800/30">
                            {transaction.fromAddress}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(transaction.fromAddress)
                            }
                            className="h-8 w-8 p-0 flex-shrink-0 hover:bg-blue-800/20"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          To Address
                        </div>
                        <div className="flex items-start gap-2">
                          <code className="text-xs font-mono bg-blue-900/20 px-3 py-2 rounded-md flex-1 break-all text-gray-200 border border-blue-800/30">
                            {transaction.toAddress}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(transaction.toAddress)
                            }
                            className="h-8 w-8 p-0 flex-shrink-0 hover:bg-blue-800/20"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Info Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      Transaction Information
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Transaction ID
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono bg-blue-900/20 px-3 py-2 rounded-md flex-1 break-all text-gray-200 border border-blue-800/30">
                            {transaction.id}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(transaction.id)}
                            className="h-8 w-8 p-0 flex-shrink-0 hover:bg-blue-800/20"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Amount
                        </div>
                        <div className="text-sm font-semibold text-blue-400 bg-blue-900/20 px-3 py-2 rounded-md border border-blue-800/30">
                          {formatAmount(transaction.amount)}
                        </div>
                      </div>

                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Full Timestamp
                        </div>
                        <div className="text-sm text-gray-200 bg-blue-900/20 px-3 py-2 rounded-md border border-blue-800/30">
                          {transaction.timestamp.toLocaleString()}
                        </div>
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
