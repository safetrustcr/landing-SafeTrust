
import { useContext } from 'react';
import { TrackerContext } from '@/components/AnalyticsProvider';

type AnalyticsPayload = Record<string, unknown>;

export function useAnalytics() {
  const context = useContext(TrackerContext);
  
  if (!context) {
    throw new Error('useAnalytics must be used within TrackerProvider');
  }
  
  return {
    track: (eventName: string, payload?: AnalyticsPayload) => context.logEvent(eventName, payload),
  };
}

// Legacy hook for backward compatibility if needed
export function useTracker() {
  const context = useContext(TrackerContext);
  
  if (!context) {
    throw new Error('useTracker must be used within TrackerProvider');
  }
  
  return context;
}
