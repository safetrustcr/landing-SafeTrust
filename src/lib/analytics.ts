import * as gtag from './analytics/gtag';

class SimpleTracker {
  private enabled = false;
  private debug = false;
  private readonly STORAGE_KEY = 'safetrust_analytics_events';
  private readonly VISITOR_KEY = 'safetrust_visitor_id';
  private visitorId: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
      this.visitorId = this.getVisitorId();
    }
  }

  setup(options: { enabled?: boolean; debug?: boolean }) {
    if (options.enabled !== undefined) this.enabled = options.enabled;
    if (options.debug !== undefined) this.debug = options.debug;

    // Initialize Google Analytics
    if (this.enabled && typeof window !== 'undefined') {
      gtag.initGA();
    }
  }

  private getVisitorId(): string {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem(this.VISITOR_KEY);
    if (!id) {
      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem(this.VISITOR_KEY, id);
    }
    return id;
  }

  track(eventName: string, payload?: AnalyticsPayload) {
    if (!this.enabled || typeof window === 'undefined') return;

    const pagePath = path || window.location.pathname;

    // Track in GA4
    gtag.pageview(pagePath);

    // Track in internal logger
    this.log({
      type: 'page_view',
      path: pagePath,
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload
    };

    // Infer type from eventName for standard events if not explicitly handled
    if (eventName === 'page_view') event.type = 'page_view';
    
    this.saveEvent(event);
    this.log(event);
  }

  // Legacy/Specific methods mapped to track
  visitPage(path?: string) {
    if (typeof window === 'undefined') return;
    this.track('page_view', { path: path || window.location.pathname });
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
      url: window.location.href,
      visitorId: this.visitorId,
      payload: extra
    };

    this.saveEvent(event);
    this.log(event);
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
      name: formName,
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload: extra
    };

    this.saveEvent(event);
    this.log(event);
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
      console.log('Analytics Event:', data);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics-event', { detail: data }));
    }
  }
}

export const tracker = new SimpleTracker();
