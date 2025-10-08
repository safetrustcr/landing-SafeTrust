class SimpleTracker {
  private enabled = true;
  private debug = false;

  setup(options: { enabled?: boolean; debug?: boolean }) {
    if (options.enabled !== undefined) this.enabled = options.enabled;
    if (options.debug !== undefined) this.debug = options.debug;
  }

  visitPage(path?: string) {
    if (!this.enabled || typeof window === 'undefined') return;
    
    this.log({
      type: 'page_view',
      path: path || window.location.pathname,
      timestamp: Date.now(),
      url: window.location.href
    });
  }

  buttonClick(name: string, extra?: any) {
    if (!this.enabled || typeof window === 'undefined') return;

    this.log({
      type: 'click',
      element: name,
      timestamp: Date.now(),
      ...extra
    });
  }

  formSubmit(formName: string, extra?: any) {
    if (!this.enabled || typeof window === 'undefined') return;

    this.log({
      type: 'form_submit',
      form: formName,
      timestamp: Date.now(),
      ...extra
    });
  }

  logEvent(eventName: string, extra?: any) {
    if (!this.enabled || typeof window === 'undefined') return;

    this.log({
      type: 'custom',
      event: eventName,
      timestamp: Date.now(),
      ...extra
    });
  }

  private log(data: any) {
    if (this.debug) {
      console.log('Event:', data);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics-event', { detail: data }));
    }
  }
}

export const tracker = new SimpleTracker();