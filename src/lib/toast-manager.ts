import { Toast } from "../types/toast";

type Subscriber = (toasts: Toast[]) => void;

class ToastManager {
  private queue: Toast[] = [];
  private active: Toast[] = [];
  private subscribers: Subscriber[] = [];
  private maxActive = 3;

  setMaxActive(n: number) {
    this.maxActive = Math.max(1, n);
    this.flush();
  }

  subscribe(cb: Subscriber) {
    this.subscribers.push(cb);
    cb(this.active);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify() {
    this.subscribers.forEach((s) => s(this.active.slice()));
  }

  push(toast: Toast) {
    this.queue.push(toast);
    this.flush();
  }

  remove(id: string) {
    this.active = this.active.filter((t) => t.id !== id);

    this.queue = this.queue.filter((t) => t.id !== id);
    this.flush();
    this.notify();
  }

  private flush() {
    while (this.active.length < this.maxActive && this.queue.length > 0) {
      const t = this.queue.shift()!;
      this.active.push(t);

      this.notify();
    }
  }
}

export const toastManager = new ToastManager();
export default toastManager;
