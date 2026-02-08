import { useRef, useCallback, useState, type TouchEvent } from "react";
import {
  getTouchPoint,
  analyzeSwipe,
  TOUCH_THRESHOLDS,
  isAtScrollTop,
  clamp,
  type TouchPoint,
  type SwipeDirection,
} from "@/utils/touch-utils";

// ========================================
// useSwipe Hook
// ========================================

export interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: (direction: SwipeDirection) => void;
  minDistance?: number;
  minVelocity?: number;
  preventDefaultTouchMove?: boolean;
}

export function useSwipe(options: UseSwipeOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
    minDistance = TOUCH_THRESHOLDS.MIN_SWIPE_DISTANCE,
    minVelocity = TOUCH_THRESHOLDS.MIN_SWIPE_VELOCITY,
    preventDefaultTouchMove = false,
  } = options;

  const startPoint = useRef<TouchPoint | null>(null);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const point = getTouchPoint(e);
      startPoint.current = {
        x: point.x,
        y: point.y,
        time: Date.now(),
      };
      isSwiping.current = false;
      onSwipeStart?.();
    },
    [onSwipeStart],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!startPoint.current) return;

      if (preventDefaultTouchMove) {
        e.preventDefault();
      }

      const point = getTouchPoint(e);
      const deltaX = Math.abs(point.x - startPoint.current.x);
      const deltaY = Math.abs(point.y - startPoint.current.y);

      if (deltaX > 10 || deltaY > 10) {
        isSwiping.current = true;
      }
    },
    [preventDefaultTouchMove],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!startPoint.current) return;

      const endPoint = getTouchPoint(e);
      const swipeData = analyzeSwipe(startPoint.current, {
        x: endPoint.x,
        y: endPoint.y,
        time: Date.now(),
      });

      const { direction, distance, velocity } = swipeData;

      if (direction && distance >= minDistance && velocity >= minVelocity) {
        switch (direction) {
          case "left":
            onSwipeLeft?.();
            break;
          case "right":
            onSwipeRight?.();
            break;
          case "up":
            onSwipeUp?.();
            break;
          case "down":
            onSwipeDown?.();
            break;
        }
      }

      onSwipeEnd?.(direction);
      startPoint.current = null;
      isSwiping.current = false;
    },
    [
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
      onSwipeEnd,
      minDistance,
      minVelocity,
    ],
  );

  const handlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return { handlers, isSwiping: isSwiping.current };
}

// ========================================
// usePullToRefresh Hook
// ========================================

export interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
  enabled?: boolean;
}

export function usePullToRefresh(options: UsePullToRefreshOptions) {
  const {
    onRefresh,
    threshold = TOUCH_THRESHOLDS.PULL_TO_REFRESH_DISTANCE,
    resistance = 2.5,
    enabled = true,
  } = options;

  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !isAtScrollTop()) return;

      const point = getTouchPoint(e);
      startY.current = point.y;
      isDragging.current = false;
    },
    [enabled],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !isAtScrollTop() || isRefreshing) return;

      const point = getTouchPoint(e);
      currentY.current = point.y;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        isDragging.current = true;
        setIsPulling(true);

        // Apply resistance
        const distance = clamp(diff / resistance, 0, threshold * 1.5);
        setPullDistance(distance);

        // Prevent default scroll when pulling
        if (diff > 10) {
          e.preventDefault();
        }
      }
    },
    [enabled, isRefreshing, resistance, threshold],
  );

  const handleTouchEnd = useCallback(async () => {
    if (!enabled || !isDragging.current) return;

    isDragging.current = false;
    setIsPulling(false);

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(threshold);

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [enabled, pullDistance, threshold, isRefreshing, onRefresh]);

  const handlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    handlers,
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress: clamp(pullDistance / threshold, 0, 1),
  };
}

// ========================================
// useLongPress Hook
// ========================================

export interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  duration?: number;
}

export function useLongPress(options: UseLongPressOptions) {
  const {
    onLongPress,
    onClick,
    duration = TOUCH_THRESHOLDS.LONG_PRESS_DURATION,
  } = options;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const start = useCallback(() => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
    }, duration);
  }, [onLongPress, duration]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!isLongPress.current && onClick) {
      onClick();
    }
  }, [onClick]);

  const handlers = {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onClick: handleClick,
  };

  return handlers;
}

// ========================================
// useTouchFeedback Hook
// ========================================

export function useTouchFeedback() {
  const [isPressed, setIsPressed] = useState(false);

  const handlers = {
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onTouchCancel: () => setIsPressed(false),
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
  };

  return { isPressed, handlers };
}
