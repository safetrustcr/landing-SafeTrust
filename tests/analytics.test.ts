/**
 * Analytics Tests
 *
 * Tests for Google Analytics integration and event tracking.
 * Run with: npm test
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock window.gtag
const mockGtag = vi.fn();
const mockDataLayer: unknown[] = [];

beforeEach(() => {
  // Reset mocks
  mockGtag.mockClear();
  mockDataLayer.length = 0;

  // Setup global mocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).window = {
    gtag: mockGtag,
    dataLayer: mockDataLayer,
    location: {
      pathname: '/test',
      href: 'https://safetrust.com/test',
    },
  };

  // Mock environment
  process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123';
});

describe('Google Analytics Integration', () => {
  it('should initialize GA with correct tracking ID', async () => {
    const { GA_TRACKING_ID } = await import('../src/lib/analytics/gtag');

    expect(GA_TRACKING_ID).toBe('G-TEST123');
  });

  it('should track page views correctly', async () => {
    const { pageview } = await import('../src/lib/analytics/gtag');

    pageview('/test-page');

    expect(mockGtag).toHaveBeenCalled();
  });

  it('should track custom events correctly', async () => {
    const { event } = await import('../src/lib/analytics/gtag');

    event({
      action: 'test_action',
      category: 'test_category',
      label: 'test_label',
      value: 100,
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'test_action', {
      event_category: 'test_category',
      event_label: 'test_label',
      value: 100,
    });
  });
});

describe('Event Tracking Functions', () => {
  it('should track button clicks', async () => {
    const { trackButtonClick } = await import('../src/lib/analytics/events');

    trackButtonClick('test-button', 'header', { custom: 'data' });

    expect(mockGtag).toHaveBeenCalledWith('event', 'button_click', expect.objectContaining({
      event_category: 'engagement',
      event_label: 'test-button',
      button_name: 'test-button',
      button_location: 'header',
      custom: 'data',
    }));
  });

  it('should track CTA clicks', async () => {
    const { trackCTAClick } = await import('../src/lib/analytics/events');

    trackCTAClick('signup-cta', 'primary', 'hero-section');

    expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', expect.objectContaining({
      event_category: 'conversion',
      cta_name: 'signup-cta',
      cta_type: 'primary',
      cta_location: 'hero-section',
    }));
  });

  it('should track form submissions', async () => {
    const { trackFormSubmit } = await import('../src/lib/analytics/events');

    trackFormSubmit('contact-form', 'contact', true);

    expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit_success', expect.objectContaining({
      event_category: 'form',
      form_name: 'contact-form',
      form_type: 'contact',
      success: true,
    }));
  });

  it('should track form submission errors', async () => {
    const { trackFormSubmit } = await import('../src/lib/analytics/events');

    trackFormSubmit('contact-form', 'contact', false, 'Invalid email');

    expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit_error', expect.objectContaining({
      event_category: 'form',
      form_name: 'contact-form',
      success: false,
      error_message: 'Invalid email',
    }));
  });

  it('should track 404 errors', async () => {
    const { track404 } = await import('../src/lib/analytics/events');

    track404('/non-existent-page', '/previous-page');

    expect(mockGtag).toHaveBeenCalledWith('event', '404_error', expect.objectContaining({
      event_category: 'error',
      page_path: '/non-existent-page',
      referrer: '/previous-page',
    }));
  });

  it('should track search queries', async () => {
    const { trackSearch } = await import('../src/lib/analytics/events');

    trackSearch('cryptocurrency', 42);

    expect(mockGtag).toHaveBeenCalledWith('event', 'search', expect.objectContaining({
      event_category: 'engagement',
      search_term: 'cryptocurrency',
      result_count: 42,
    }));
  });

  it('should track downloads', async () => {
    const { trackDownload } = await import('../src/lib/analytics/events');

    trackDownload('whitepaper.pdf', 'pdf');

    expect(mockGtag).toHaveBeenCalledWith('event', 'file_download', expect.objectContaining({
      event_category: 'engagement',
      file_name: 'whitepaper.pdf',
      file_type: 'pdf',
    }));
  });

  it('should track user signups', async () => {
    const { trackSignup } = await import('../src/lib/analytics/events');

    trackSignup('email', 'user123');

    expect(mockGtag).toHaveBeenCalledWith('event', 'sign_up', expect.objectContaining({
      event_category: 'conversion',
      signup_method: 'email',
      user_id: 'user123',
    }));
  });
});

describe('Performance Monitoring', () => {
  it('should have correct Web Vitals thresholds', async () => {
    const { initPerformanceMonitoring, getPerformanceMetrics } = await import('../src/lib/performance-monitor');

    await initPerformanceMonitoring();
    const metrics = getPerformanceMetrics();

    expect(metrics).toBeDefined();
  });
});

describe('SEO Configuration', () => {
  it('should have correct site configuration', async () => {
    const { siteConfig } = await import('../src/config/seo');

    expect(siteConfig.name).toBe('SafeTrust');
    expect(siteConfig.url).toBeDefined();
    expect(siteConfig.keywords).toContain('SafeTrust');
  });

  it('should generate page metadata correctly', async () => {
    const { generatePageMetadata } = await import('../src/config/seo');

    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'Test description',
      path: '/test',
    });

    expect(metadata.title).toBe('Test Page');
    expect(metadata.description).toBe('Test description');
  });

  it('should generate structured data correctly', async () => {
    const { structuredData } = await import('../src/config/seo');

    const breadcrumb = structuredData.breadcrumb([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]);

    expect(breadcrumb['@type']).toBe('BreadcrumbList');
    expect(breadcrumb.itemListElement).toHaveLength(2);
  });
});
