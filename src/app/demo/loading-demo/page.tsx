"use client";

import React, { useEffect } from "react";
import SkeletonCard from "@/components/loading/SkeletonCard";
import SkeletonTable from "@/components/loading/SkeletonTable";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ProgressBar from "@/components/loading/ProgressBar";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useLoadingState } from "@/hooks/use-loading-state";
import { Button } from "@/components/ui/button";

async function fakeFetch(success = true, delay = 2000) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (success) resolve("✅ Data fetched successfully!");
      else reject(new Error("❌ Failed to fetch data"));
    }, delay);
  });
}

export default function LoadingDemoPage() {
  const { isLoading, data, error, execute } = useLoadingState(fakeFetch);

  useEffect(() => {
    execute(true); // initial load success
  }, [execute]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground p-8 space-y-10">
        <h1 className="text-2xl font-bold">🔄 Loading States Demo</h1>

        {/* Spinner + Progress Bar */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Loaders</h2>
          <div className="flex items-center gap-6">
            <LoadingSpinner size={32} />
            <ProgressBar value={50} className="w-1/2" />
            <ProgressBar className="w-1/2" /> {/* indeterminate */}
          </div>
        </section>

        {/* Skeletons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skeleton Screens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonTable rows={3} columns={4} />
          </div>
        </section>

        {/* useLoadingState Demo */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">useLoadingState Hook</h2>

          {isLoading && (
            <div className="flex items-center gap-4">
              <LoadingSpinner />
              <span>Loading data...</span>
            </div>
          )}

          {error && (
            <div className="text-destructive">
              {error.message} —{" "}
              <Button variant="outline" onClick={() => execute(true)}>
                Retry
              </Button>
            </div>
          )}

          {data && <div className="text-green-600">{data}</div>}

          <div className="flex gap-4 mt-4">
            <Button onClick={() => execute(true)}>Simulate Success</Button>
            <Button variant="destructive" onClick={() => execute(false)}>
              Simulate Error
            </Button>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
