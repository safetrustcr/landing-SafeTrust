"use client";

import { createContext, useEffect, ReactNode } from 'react';
import { tracker } from '@/lib/analytics';

export const TrackerContext = createContext<{
  logEvent: (event: string, data?: any) => void;
  visitPage: (path?: string) => void;
  buttonClick: (element: string, data?: any) => void;
  formSubmit: (form: string, data?: any) => void;
} | null>(null);

export function TrackerProvider({ children, enabled = true, debug = false }: { children: ReactNode; enabled?: boolean; debug?: boolean; }) {
  useEffect(() => {
    tracker.setup({ enabled, debug });
  }, [enabled, debug]);

  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      tracker.visitPage();
    }
  }, [enabled]);

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