import * as gtag from './analytics/gtag';

class SimpleTracker {
  private enabled = true;
  private debug = false;

  setup(options: { enabled?: boolean; debug?: boolean }) {
    if (options.enabled !== undefined) this.enabled = options.enabled;
    if (options.debug !== undefined) this.debug = options.debug;

    // Initialize Google Analytics
    if (this.enabled && typeof window !== 'undefined') {
      gtag.initGA();
    }
  }

  visitPage(path?: string) {
    if (!this.enabled || typeof window === 'undefined') return;

    const pagePath = path || window.location.pathname;

    // Track in GA4
    gtag.pageview(pagePath);

    // Track in internal logger
    this.log({
      type: 'page_view',
      path: pagePath,
      timestamp: Date.now(),
      url: window.location.href
    });
  }

  buttonClick(name: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === 'undefined') return;

    // Track in GA4
    gtag.event({
      action: 'button_click',
      category: 'engagement',
      label: name,
      ...extra,
    });

    // Track in internal logger
    this.log({
      type: 'click',
      element: name,
      timestamp: Date.now(),
      ...extra
    });
  }

  formSubmit(formName: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === 'undefined') return;

    // Track in GA4
    gtag.event({
      action: 'form_submit',
      category: 'form',
      label: formName,
      ...extra,
    });

    // Track in internal logger
    this.log({
      type: 'form_submit',
      form: formName,
      timestamp: Date.now(),
      ...extra
    });
  }

  logEvent(eventName: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === 'undefined') return;

    // Track in GA4
    gtag.event({
      action: eventName,
      category: 'custom',
      label: eventName,
      ...extra,
    });

    // Track in internal logger
    this.log({
      type: 'custom',
      event: eventName,
      timestamp: Date.now(),
      ...extra
    });
  }

  private log(data: Record<string, unknown>) {
    if (this.debug) {
      console.log('Event:', data);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics-event', { detail: data }));
    }
  }
}

export const tracker = new SimpleTracker();