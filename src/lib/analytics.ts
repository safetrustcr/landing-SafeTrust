import * as gtag from "./analytics/gtag";

const event: AnalyticsEvent = {
  type: eventName === "page_view" ? "page_view" : "custom",
  name: eventName,
  path: pagePath,
  timestamp: Date.now(),
  url: window.location.href,
  visitorId: this.visitorId,
  payload: eventName === "page_view" ? payload : { eventName, ...payload },
};

class SimpleTracker {
  private enabled = false;
  private debug = false;
  private readonly STORAGE_KEY = "safetrust_analytics_events";
  private readonly VISITOR_KEY = "safetrust_visitor_id";
  private visitorId: string = "";

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
      this.visitorId = this.getVisitorId();
    }
  }

  setup(options: { enabled?: boolean; debug?: boolean }) {
    if (options.enabled !== undefined) this.enabled = options.enabled;
    if (options.debug !== undefined) this.debug = options.debug;

    // Initialize Google Analytics
    if (this.enabled && typeof window !== "undefined") {
      gtag.initGA();
    }
  }

  private getVisitorId(): string {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem(this.VISITOR_KEY);
    if (!id) {
      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem(this.VISITOR_KEY, id);
    }
    return id;
  }

  getHistory(): AnalyticsEvent[] {
    if (typeof window === "undefined") return [];

    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch (e) {
      console.warn("Failed to read analytics history", e);
      return [];
    }
  }

  private saveEvent(event: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    try {
      const events = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
      events.push(event);
      // Keep only last 100 events to prevent quota issues
      if (events.length > 100) events.shift();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn("Failed to save analytics event", e);
    }
  }

  track(eventName: string, payload?: Record<string, unknown>) {
    if (!this.enabled || typeof window === "undefined") return;

    const pagePath = window.location.pathname;

    // Track in GA4
    if (eventName === "page_view") {
      gtag.pageview(pagePath);
    }

    const event: AnalyticsEvent = {
      type: eventName === "page_view" ? "page_view" : "custom",
      path: pagePath,
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload,
    };

    this.saveEvent(event);
    this.log(event);
  }

  // Legacy/Specific methods mapped to track
  visitPage(path?: string) {
    if (typeof window === "undefined") return;
    this.track("page_view", { path: path || window.location.pathname });
  }

  buttonClick(name: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === "undefined") return;

    // Track in GA4
    gtag.event({
      action: "button_click",
      category: "engagement",
      label: name,
      ...extra,
    });

    const event: AnalyticsEvent = {
      type: "button_click",
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload: {
        element: name,
        ...extra,
      },
    };

    this.saveEvent(event);
    this.log(event);
  }

  formSubmit(formName: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === "undefined") return;

    // Track in GA4
    gtag.event({
      action: "form_submit",
      category: "form",
      label: formName,
      ...extra,
    });

    const event: AnalyticsEvent = {
      type: "form_submit",
      timestamp: Date.now(),
      url: window.location.href,
      visitorId: this.visitorId,
      payload: {
        formName,
        ...extra,
      },
    };

    this.saveEvent(event);
    this.log(event);
  }

  logEvent(eventName: string, extra?: Record<string, unknown>) {
    if (!this.enabled || typeof window === "undefined") return;

    // Track in GA4
    gtag.event({
      action: eventName,
      category: "custom",
      label: eventName,
      ...extra,
    });

    const event: AnalyticsEvent = {
      type: "custom",
      timestamp: Date.now(),
      visitorId: this.visitorId,
      payload: {
        eventName,
        ...extra,
      },
    };

    // Track in internal logger
    this.saveEvent(event);
    this.log(event);
  }

  private log(data: Record<string, unknown>) {
    if (this.debug) {
      console.log("Analytics Event:", data);
    }

     if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('analytics-event', {
          detail: data,
        })
      );
    }
  }
}

export const tracker = new SimpleTracker();
