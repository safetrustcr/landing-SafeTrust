"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, TrendingUp, XCircle } from "lucide-react";

const stats = [
  {
    label: "Total Transactions",
    value: "5",
    valueClassName: "text-white",
    borderClassName: "border-l-white/70",
    icon: TrendingUp,
  },
  {
    label: "Pending",
    value: "2",
    valueClassName: "text-amber-300",
    borderClassName: "border-l-amber-400",
    icon: Clock,
  },
  {
    label: "Completed",
    value: "2",
    valueClassName: "text-green-300",
    borderClassName: "border-l-green-400",
    icon: CheckCircle,
  },
  {
    label: "Failed",
    value: "1",
    valueClassName: "text-red-300",
    borderClassName: "border-l-red-400",
    icon: XCircle,
  },
];

const transactions = [
  {
    hash: "0x5678...1234",
    status: "Pending",
    amount: "1,250 XLM",
    timestamp: "Apr 29, 2026 09:42",
  },
  {
    hash: "0x9A31...7B20",
    status: "Completed",
    amount: "820 XLM",
    timestamp: "Apr 29, 2026 08:15",
  },
  {
    hash: "0xC442...F891",
    status: "Failed",
    amount: "340 XLM",
    timestamp: "Apr 28, 2026 18:33",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Completed: "border-green-400/30 bg-green-400/10 text-green-200",
  Failed: "border-red-400/30 bg-red-400/10 text-red-200",
};

export default function TransactionPreviewSection() {
  return (
    <section
      id="transaction-preview"
      className="bg-white py-14 dark:bg-gray-950 md:py-16"
      aria-labelledby="transaction-preview-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl rounded-lg border border-blue-800/30 bg-[#0f1117] p-4 text-white shadow-2xl shadow-blue-950/20 sm:p-5 md:p-6">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Live product preview
              </p>
              <h2
                id="transaction-preview-heading"
                className="mt-1 text-2xl font-bold text-white md:text-3xl"
              >
                Transaction Preview
              </h2>
            </div>
            <p className="max-w-md text-sm text-gray-400">
              A compact look at SafeTrust escrow activity on Stellar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`rounded-md border border-blue-800/30 border-l-4 bg-blue-900/10 p-3 backdrop-blur-sm ${stat.borderClassName}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className={`text-xl font-bold ${stat.valueClassName}`}>
                        {stat.value}
                      </div>
                      <div className="truncate text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                    <Icon className={`h-5 w-5 flex-shrink-0 ${stat.valueClassName}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 overflow-hidden rounded-md border border-blue-800/30 bg-[#111827]/70">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.hash}
                className={`grid gap-2 px-3 py-3 text-sm sm:grid-cols-[1.1fr_auto_auto_1fr] sm:items-center sm:gap-4 sm:px-4 ${
                  index === transactions.length - 1
                    ? ""
                    : "border-b border-blue-800/25"
                }`}
              >
                <span className="font-mono text-gray-100">{transaction.hash}</span>
                <span
                  className={`w-fit rounded-full border px-2 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}
                >
                  {transaction.status}
                </span>
                <span className="font-semibold text-blue-100">
                  {transaction.amount}
                </span>
                <span className="text-left text-xs text-gray-400 sm:text-right">
                  {transaction.timestamp}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-[#336AD9] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#0f1117]"
            >
              View Full Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
