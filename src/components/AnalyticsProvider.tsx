
"use client";

import { createContext, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { tracker } from '@/lib/analytics';

type AnalyticsPayload = Record<string, unknown>;

export interface TrackerContextValue {
  logEvent: (event: string, data?: AnalyticsPayload) => void;
  visitPage: (path?: string) => void;
  buttonClick: (element: string, data?: AnalyticsPayload) => void;
  formSubmit: (form: string, data?: AnalyticsPayload) => void;
}

export const TrackerContext = createContext<TrackerContextValue | null>(null);

export function TrackerProvider({ children, enabled = true, debug = false }: { children: ReactNode; enabled?: boolean; debug?: boolean; }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    tracker.setup({ enabled, debug });
  }, [enabled, debug]);

  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      tracker.visitPage(url);
    }
  }, [pathname, searchParams, enabled]);

  const value = {
    logEvent: tracker.logEvent.bind(tracker),
    visitPage: tracker.visitPage.bind(tracker),
    buttonClick: tracker.buttonClick.bind(tracker),
    formSubmit: tracker.formSubmit.bind(tracker)
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
}
