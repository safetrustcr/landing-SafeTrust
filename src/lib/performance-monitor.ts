export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export interface WebVitals {
  LCP?: PerformanceMetric;
  FID?: PerformanceMetric;
  CLS?: PerformanceMetric;
  FCP?: PerformanceMetric;
  TTFB?: PerformanceMetric;
  INP?: PerformanceMetric;
}

type MetricName = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP';
type MetricCallback = (metric: PerformanceMetric) => void;

const THRESHOLDS: Record<MetricName, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(
  name: MetricName,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name];
  if (!threshold) return 'good';
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: WebVitals = {};
  private callbacks: MetricCallback[] = [];
  private isInitialized = false;

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  async init(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    this.initFallbackMetrics();
    this.observeLongTasks();
    this.observeResourceTiming();
  }

  private initFallbackMetrics(): void {
    if (typeof window === 'undefined') return;

    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', entry.startTime);
          }
          if (entry.name === 'largest-contentful-paint') {
            this.recordMetric('LCP', entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch {
      // Observer not supported
    }

    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
            this.recordMetric('CLS', clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // Observer not supported
    }

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.recordMetric('TTFB', navigation.responseStart);
      }
    });
  }

  private recordMetric(name: MetricName, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: getRating(name, value),
      timestamp: Date.now(),
    };

    this.metrics[name] = metric;
    this.notifyCallbacks(metric);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${value.toFixed(2)} (${metric.rating})`);
    }
  }

  private observeLongTasks(): void {
    if (typeof window === 'undefined') return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch {
      // Long task observer not supported
    }
  }

  private observeResourceTiming(): void {
    if (typeof window === 'undefined') return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          if (process.env.NODE_ENV === 'development' && resource.duration > 1000) {
            console.warn(`[Performance] Slow resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch {
      // Resource timing observer not supported
    }
  }

  onMetric(callback: MetricCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  private notifyCallbacks(metric: PerformanceMetric): void {
    this.callbacks.forEach((callback) => callback(metric));
  }

  getMetrics(): WebVitals {
    return { ...this.metrics };
  }

  getReport(): {
    metrics: WebVitals;
    score: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let totalScore = 0;
    let metricCount = 0;

    Object.entries(this.metrics).forEach(([name, metric]) => {
      if (metric) {
        metricCount++;
        if (metric.rating === 'good') totalScore += 100;
        else if (metric.rating === 'needs-improvement') totalScore += 50;

        if (metric.rating !== 'good') {
          recommendations.push(this.getRecommendation(name as keyof WebVitals, metric));
        }
      }
    });

    return {
      metrics: this.metrics,
      score: metricCount > 0 ? Math.round(totalScore / metricCount) : 0,
      recommendations,
    };
  }

  private getRecommendation(name: keyof WebVitals, metric: PerformanceMetric): string {
    const recommendations: Record<string, string> = {
      LCP: 'Optimize largest content element. Consider lazy loading images and preloading critical resources.',
      FID: 'Reduce JavaScript execution time. Consider code splitting and deferring non-critical scripts.',
      CLS: 'Reserve space for dynamic content. Set explicit dimensions on images and embeds.',
      FCP: 'Optimize server response time and reduce render-blocking resources.',
      TTFB: 'Improve server response time. Consider using a CDN or optimizing database queries.',
      INP: 'Optimize event handlers and reduce main thread work during interactions.',
    };

    return `${name} (${metric.value.toFixed(2)}): ${recommendations[name] || 'Optimize this metric.'}`;
  }

  mark(name: string): void {
    if (typeof window !== 'undefined' && performance.mark) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof window === 'undefined' || !performance.measure) return null;

    try {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }

      const measures = performance.getEntriesByName(name, 'measure');
      const lastMeasure = measures[measures.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${lastMeasure?.duration.toFixed(2)}ms`);
      }

      return lastMeasure?.duration ?? null;
    } catch {
      return null;
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

export const initPerformanceMonitoring = (): Promise<void> => performanceMonitor.init();
export const getPerformanceMetrics = (): WebVitals => performanceMonitor.getMetrics();
export const getPerformanceReport = (): ReturnType<typeof performanceMonitor.getReport> => 
  performanceMonitor.getReport();
export const onPerformanceMetric = (callback: MetricCallback): (() => void) => 
  performanceMonitor.onMetric(callback);
export const markPerformance = (name: string): void => performanceMonitor.mark(name);
export const measurePerformance = (name: string, startMark: string, endMark?: string): number | null =>
  performanceMonitor.measure(name, startMark, endMark);

export default performanceMonitor;
