// src/utils/touch-utils.ts

export interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

export type SwipeDirection = "left" | "right" | "up" | "down" | null;

export interface SwipeResult {
  direction: SwipeDirection;
  distance: number;
  velocity: number;
  duration: number;
}

// Threshold constants
export const TOUCH_THRESHOLDS = {
  MIN_SWIPE_DISTANCE: 50, // Minimum pixels to register as swipe
  MIN_SWIPE_VELOCITY: 0.3, // Minimum velocity (px/ms)
  MAX_VERTICAL_DEVIATION: 100, // Max vertical movement for horizontal swipe
  PULL_TO_REFRESH_DISTANCE: 80, // Distance to trigger refresh
  LONG_PRESS_DURATION: 500, // ms for long press
} as const;

/**
 * Detects the direction of a swipe gesture
 */
export function detectSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  minDistance: number = TOUCH_THRESHOLDS.MIN_SWIPE_DISTANCE,
): SwipeDirection {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  // Not enough movement
  if (absDeltaX < minDistance && absDeltaY < minDistance) {
    return null;
  }

  // Horizontal swipe
  if (absDeltaX > absDeltaY) {
    return deltaX > 0 ? "right" : "left";
  }

  // Vertical swipe
  return deltaY > 0 ? "down" : "up";
}

/**
 * Calculates swipe velocity
 */
export function calculateSwipeVelocity(
  distance: number,
  duration: number,
): number {
  if (duration === 0) return 0;
  return Math.abs(distance) / duration; // px per ms
}

/**
 * Analyzes a complete swipe gesture
 */
export function analyzeSwipe(start: TouchPoint, end: TouchPoint): SwipeResult {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const duration = end.time - start.time;
  const direction = detectSwipeDirection(start.x, start.y, end.x, end.y);
  const velocity = calculateSwipeVelocity(distance, duration);

  return {
    direction,
    distance,
    velocity,
    duration,
  };
}

/**
 * Checks if the current device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - for older browsers
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Normalizes touch/mouse event to get coordinates
 */
export function getTouchPoint(
  event: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent,
): { x: number; y: number } {
  if ("touches" in event && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if ("changedTouches" in event && event.changedTouches.length > 0) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }

  return {
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
  };
}

/**
 * Prevents iOS rubber band bounce effect
 */
export function preventIOSBounce(): void {
  if (typeof window === "undefined") return;

  const preventDefault = (e: Event) => {
    if ((e.target as HTMLElement).tagName !== "INPUT") {
      e.preventDefault();
    }
  };

  document.addEventListener("touchmove", preventDefault, { passive: false });
}

/**
 * Checks if element is scrollable
 */
export function isScrollable(element: HTMLElement | null): boolean {
  if (!element) return false;

  const hasScrollableContent = element.scrollHeight > element.clientHeight;
  const overflowYStyle = window.getComputedStyle(element).overflowY;
  const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

  return hasScrollableContent && !isOverflowHidden;
}

/**
 * Gets the scroll parent of an element
 */
export function getScrollParent(
  element: HTMLElement | null,
): HTMLElement | null {
  if (!element) return null;

  let parent = element.parentElement;

  while (parent) {
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return document.documentElement as HTMLElement;
}

/**
 * Checks if user is at the top of scrollable container
 */
export function isAtScrollTop(element: HTMLElement | null = null): boolean {
  const scrollElement = element || document.documentElement;
  return scrollElement.scrollTop === 0;
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates spring animation value
 */
export function springValue(
  current: number,
  target: number,
  tension: number = 0.3,
): number {
  return current + (target - current) * tension;
}
