"use client";

import { useState, useCallback } from "react";

type LoadingState<T = any> = {
  data?: T;
  error: string | null;
  isLoading: boolean;
  progress: number;
};

export function useLoadingState<T = any>() {
  const [state, setState] = useState<LoadingState<T>>({
    isLoading: false,
    error: null,
    data: undefined,
    progress: 0,
  });

  // Start loading with an async function
  const startLoading = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ isLoading: true, error: null, data: undefined, progress: 0 });

    try {
      // Fake progress animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setState((prev) => ({ ...prev, progress: Math.min(progress, 90) }));
      }, 300);

      const data = await asyncFunction();

      clearInterval(interval);
      setState({ isLoading: false, error: null, data, progress: 100 });
      return data;
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.message || "Error",
        data: undefined,
        progress: 0,
      });
      throw err;
    }
  }, []);

  // Fail manually
  const failLoading = useCallback((message: string) => {
    setState({
      isLoading: false,
      error: message,
      data: undefined,
      progress: 0,
    });
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, data: undefined, progress: 0 });
  }, []);

  return { ...state, startLoading, failLoading, reset };
}
