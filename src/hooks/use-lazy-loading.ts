'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyLoadingOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  initialInView?: boolean;
  onInView?: () => void;
  onOutOfView?: () => void;
  skip?: boolean;
}

interface UseLazyLoadingReturn<T extends HTMLElement> {
  ref: React.RefCallback<T>;
  isInView: boolean;
  hasBeenInView: boolean;
  isObserving: boolean;
}

export function useLazyLoading<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadingOptions = {}
): UseLazyLoadingReturn<T> {
  const {
    rootMargin = '100px',
    threshold = 0,
    triggerOnce = true,
    initialInView = false,
    onInView,
    onOutOfView,
    skip = false,
  } = options;

  const [isInView, setIsInView] = useState(skip || initialInView);
  const [hasBeenInView, setHasBeenInView] = useState(skip || initialInView);
  const [isObserving, setIsObserving] = useState(false);
  
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback((node: T | null) => {
    if (observerRef.current && elementRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    elementRef.current = node;

    if (!node || skip) {
      setIsObserving(false);
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          const inView = entry.isIntersecting;
          setIsInView(inView);

          if (inView) {
            setHasBeenInView(true);
            onInView?.();

            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(node);
              setIsObserving(false);
            }
          } else {
            onOutOfView?.();
          }
        },
        { rootMargin, threshold }
      );

      observerRef.current.observe(node);
      setIsObserving(true);
    } else {
      setIsInView(true);
      setHasBeenInView(true);
    }
  }, [rootMargin, threshold, triggerOnce, onInView, onOutOfView, skip]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ref: setRef, isInView, hasBeenInView, isObserving };
}

interface UseLazyImageOptions extends UseLazyLoadingOptions {
  placeholder?: string;
  loadDelay?: number;
}

interface UseLazyImageReturn {
  ref: React.RefCallback<HTMLImageElement>;
  isInView: boolean;
  hasBeenInView: boolean;
  isLoaded: boolean;
  error: Error | null;
  currentSrc: string | undefined;
  imgProps: {
    src: string | undefined;
    'data-loaded': boolean;
  };
}

export function useLazyImage(
  src: string,
  options: UseLazyImageOptions = {}
): UseLazyImageReturn {
  const { placeholder, loadDelay = 0, ...lazyOptions } = options;
  const { ref, isInView, hasBeenInView } = useLazyLoading<HTMLImageElement>(lazyOptions);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!hasBeenInView || isLoaded) return;

    const timeoutId = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        setError(null);
      };
      img.onerror = () => {
        setError(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    }, loadDelay);

    return () => clearTimeout(timeoutId);
  }, [hasBeenInView, src, loadDelay, isLoaded]);

  return {
    ref,
    isInView,
    hasBeenInView,
    isLoaded,
    error,
    currentSrc: isLoaded ? src : placeholder,
    imgProps: {
      src: isLoaded ? src : placeholder,
      'data-loaded': isLoaded,
    },
  };
}

interface UseInfiniteScrollOptions {
  rootMargin?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  enabled?: boolean;
}

interface UseInfiniteScrollReturn {
  ref: React.RefCallback<HTMLDivElement>;
  isInView: boolean;
}

export function useInfiniteScroll(
  onLoadMore: () => void | Promise<void>,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const {
    rootMargin = '200px',
    hasMore = true,
    isLoading = false,
    enabled = true,
  } = options;

  const loadMoreRef = useRef(onLoadMore);
  loadMoreRef.current = onLoadMore;

  const { ref, isInView } = useLazyLoading<HTMLDivElement>({
    rootMargin,
    triggerOnce: false,
    skip: !enabled || !hasMore || isLoading,
  });

  useEffect(() => {
    if (isInView && !isLoading && hasMore && enabled) {
      loadMoreRef.current();
    }
  }, [isInView, isLoading, hasMore, enabled]);

  return { ref, isInView };
}

interface UsePreloadReturn {
  preload: (importFn: () => Promise<unknown>, key: string) => Promise<void>;
  preloadOnHover: (importFn: () => Promise<unknown>, key: string) => {
    onMouseEnter: () => void;
    onFocus: () => void;
  };
  isPreloaded: (key: string) => boolean;
}

export function usePreload(): UsePreloadReturn {
  const preloadedRef = useRef<Set<string>>(new Set());

  const preload = useCallback(
    async (importFn: () => Promise<unknown>, key: string) => {
      if (preloadedRef.current.has(key)) return;
      preloadedRef.current.add(key);
      
      try {
        await importFn();
      } catch (error) {
        console.warn(`Failed to preload: ${key}`, error);
        preloadedRef.current.delete(key);
      }
    },
    []
  );

  const preloadOnHover = useCallback(
    (importFn: () => Promise<unknown>, key: string) => ({
      onMouseEnter: () => preload(importFn, key),
      onFocus: () => preload(importFn, key),
    }),
    [preload]
  );

  const isPreloaded = useCallback((key: string) => preloadedRef.current.has(key), []);

  return { preload, preloadOnHover, isPreloaded };
}

export default useLazyLoading;
