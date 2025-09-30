"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/loading/SkeletonCard";
import SkeletonTable from "@/components/loading/SkeletonTable";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ProgressBar from "@/components/loading/ProgressBar";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useLoadingState } from "@/hooks/use-loading-state";
import {
  Shield,
  Lock,
  Zap,
  Bot,
  Link as LinkIcon,
  Globe,
  KeyRound,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FEATURE_LIST: Feature[] = [
  {
    title: "Cross-Chain Compatibility",
    description:
      "Transact seamlessly across Ethereum, Stellar, and other blockchains.",
    icon: <Globe className="w-10 h-10 text-blue-400" />,
  },
  {
    title: "Secure Escrow System",
    description:
      "Create and manage deposits with advanced, customizable escrow.",
    icon: <Shield className="w-10 h-10 text-purple-400" />,
  },
  {
    title: "Asset Protection",
    description: "Blue-chip grade protocols with multi-signature security.",
    icon: <Lock className="w-10 h-10 text-indigo-400" />,
  },
  {
    title: "Real-Time Settlement",
    description: "Instant transfers with enterprise blockchain speed.",
    icon: <Zap className="w-10 h-10 text-yellow-400" />,
  },
  {
    title: "Smart Contracts",
    description: "AI-powered contracts automate complex agreements safely.",
    icon: <Bot className="w-10 h-10 text-green-400" />,
  },
  {
    title: "DeFi Integration",
    description: "Connect with leading DeFi protocols while staying secure.",
    icon: <LinkIcon className="w-10 h-10 text-pink-400" />,
  },
];

export default function LoadingDemoPage() {
  const { isLoading, error, progress, startLoading, failLoading, reset } =
    useLoadingState();

  const [features, setFeatures] = useState<Feature[]>([
    {
      title: "SafeTrust Platform",
      description: "Next-generation secure blockchain transactions.",
      icon: <KeyRound className="w-10 h-10 text-cyan-400" />,
    },
  ]);

  const handleLoad = () => {
    startLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setFeatures(FEATURE_LIST);
      return FEATURE_LIST;
    });
  };

  const handleFail = () => {
    failLoading("Something went wrong while fetching demo data.");
    setFeatures([]);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-12 p-6 pt-20 pb-20">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl">
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                Demo Environment
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-blue-300 bg-clip-text text-transparent">
              SafeTrust Loading States
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience smooth loading transitions, skeleton states, and error
              handling designed for enterprise-grade blockchain applications.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : error ? (
                <div className="col-span-full">
                  <div className="p-8 border border-red-500/30 rounded-2xl bg-red-950/30 backdrop-blur-xl">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">
                        ⚠️
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-300 mb-2">
                          Error Loading Data
                        </h3>
                        <p className="text-red-200/70">{error}</p>
                      </div>
                      <Button
                        onClick={reset}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group p-6 border border-slate-700/50 rounded-2xl bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                  >
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-slate-100 mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Transactions Section */}
          <div className="w-full max-w-4xl">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <div className="p-8 border border-slate-700/50 rounded-2xl bg-slate-900/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-100">
                    Recent Blockchain Transactions
                  </h3>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-medium">
                    Live
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Escrow Deposit",
                      amount: "Ξ 0.5 ETH",
                      status: "confirmed",
                    },
                    {
                      label: "Settlement Release",
                      amount: "Ξ 1.2 ETH",
                      status: "confirmed",
                    },
                    {
                      label: "DeFi Integration Swap",
                      amount: "Ξ 0.3 ETH → USDC",
                      status: "pending",
                    },
                    {
                      label: "Refund",
                      amount: "Ξ 0.1 ETH",
                      status: "confirmed",
                    },
                  ].map((tx, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            tx.status === "confirmed"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          } animate-pulse`}
                        ></div>
                        <span className="text-slate-300">{tx.label}</span>
                      </div>
                      <span className="font-mono text-blue-300 font-medium">
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loading Indicators */}
          {isLoading && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <LoadingSpinner />
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Loading data...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <ProgressBar value={progress} />
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleLoad}
              disabled={isLoading}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Load Demo Data
            </Button>
            <Button
              onClick={handleFail}
              disabled={isLoading}
              className="px-8 py-6 text-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Simulate Error
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
