
type EventType = 'page_view' | 'button_click' | 'form_submit' | 'custom';

type AnalyticsPayload = Record<string, unknown>;

export interface AnalyticsEvent {
  type: EventType;
  name: string; // e.g. 'page_view', 'get_started', 'contact_form'
  timestamp: number;
  url: string;
  visitorId: string;
  payload?: AnalyticsPayload;
}

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

    const event: AnalyticsEvent = {
      type: 'custom',
      name: eventName,
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

  buttonClick(name: string, extra?: AnalyticsPayload) {
    if (!this.enabled || typeof window === 'undefined') return;

    const event: AnalyticsEvent = {
      type: 'button_click',
      name: name,
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload: extra
    };

    this.saveEvent(event);
    this.log(event);
  }

  formSubmit(formName: string, extra?: AnalyticsPayload) {
    if (!this.enabled || typeof window === 'undefined') return;

    const event: AnalyticsEvent = {
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

  logEvent(eventName: string, extra?: AnalyticsPayload) {
    this.track(eventName, extra);
  }

  getHistory(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse analytics history', e);
      return [];
    }
  }

  private saveEvent(event: AnalyticsEvent) {
    try {
      const history = this.getHistory();
      history.push(event);
      // Keep last 1000 events to prevent quota exceeded
      if (history.length > 1000) {
        history.shift();
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save analytics event', e);
    }
  }

  private log(data: AnalyticsEvent) {
    if (this.debug) {
      console.log('Analytics Event:', data);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics-event', { detail: data }));
    }
  }
}

export const tracker = new SimpleTracker();
