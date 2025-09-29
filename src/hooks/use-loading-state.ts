"use client";

import { useState, useCallback } from "react";

type LoadingState<T = any> = {
  data?: T;
  error?: Error | null;
  isLoading: boolean;
};

export function useLoadingState<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>
) {
  const [state, setState] = useState<LoadingState<T>>({
    isLoading: false,
    error: null,
    data: undefined,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ isLoading: true, error: null, data: undefined });
      try {
        const data = await asyncFunction(...args);
        setState({ isLoading: false, error: null, data });
        return data;
      } catch (error: any) {
        setState({ isLoading: false, error, data: undefined });
        throw error;
      }
    },
    [asyncFunction]
  );

  return { ...state, execute };
}
