"use client";

import { useState, useEffect, useRef } from "react";

export interface CounterAnimationOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  useIntersectionObserver?: boolean;
  threshold?: number;
}

export interface CounterAnimationResult {
  value: number;
  isAnimating: boolean;
  ref: React.RefObject<HTMLElement | null>;
}


export function useCounterAnimation({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  useIntersectionObserver = true,
  threshold = 0.5,
}: CounterAnimationOptions): CounterAnimationResult {
  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(!useIntersectionObserver);
  const ref = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Easing function - easeOutQuad for smooth deceleration
  const easeOutQuad = (t: number): number => {
    return t * (2 - t);
  };

  useEffect(() => {
    if (!useIntersectionObserver) {
      setHasStarted(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [useIntersectionObserver, threshold, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const range = end - start;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing function
      const easedProgress = easeOutQuad(progress);
      const currentValue = start + range * easedProgress;

      setValue(parseFloat(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setValue(parseFloat(end.toFixed(decimals)));
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasStarted, start, end, duration, decimals]);

  return { value, isAnimating, ref };
}
