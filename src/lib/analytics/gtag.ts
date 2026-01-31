/**
 * Google Analytics 4 Configuration
 *
 * This module handles Google Analytics 4 (GA4) integration.
 * Set NEXT_PUBLIC_GA_ID in your .env.local file to enable tracking.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Check if GA is enabled
export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA_TRACKING_ID && process.env.NODE_ENV === 'production';
};

// Initialize gtag
export const initGA = (): void => {
  if (!isGAEnabled()) return;

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll handle page views manually
  });
};

// Page view tracking
export const pageview = (url: string): void => {
  if (!isGAEnabled() || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Page view:', url);
  }
};

// Generic event tracking
export interface GtagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export const event = ({ action, category, label, value, ...params }: GtagEvent): void => {
  if (!isGAEnabled() || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Event:', { action, category, label, value, ...params });
  }
};

// TypeScript declarations
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}
