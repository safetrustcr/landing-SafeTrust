'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring, onPerformanceMetric } from '@/lib/performance-monitor';

export function PerformanceInitializer(): null {
  useEffect(() => {
    initPerformanceMonitoring();

    if (process.env.NODE_ENV === 'development') {
      const unsubscribe = onPerformanceMetric((metric) => {
        if (metric.rating === 'poor') {
          console.warn(`[Performance Warning] ${metric.name} is poor: ${metric.value}`);
        }
      });

      return unsubscribe;
    }
  }, []);

  return null;
}

export default PerformanceInitializer;
