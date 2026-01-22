'use client';

import React, { Suspense, ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function LazyWrapper({
  children,
  fallback,
  className = '',
}: LazyWrapperProps): React.ReactElement {
  const defaultFallback = (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <LoadingSpinner size={32} />
    </div>
  );

  return (
    <Suspense fallback={fallback ?? defaultFallback}>
      {children}
    </Suspense>
  );
}

interface LazySkeletonFallbackProps {
  height?: string;
  className?: string;
}

export function LazySkeletonFallback({ 
  height = '200px',
  className = '' 
}: LazySkeletonFallbackProps): React.ReactElement {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
      style={{ height }}
    />
  );
}

interface CreateLazyComponentOptions {
  loading?: ReactNode;
  ssr?: boolean;
  loadingHeight?: string;
}

type AnyProps = Record<string, unknown>;

export function createLazyComponent<P extends AnyProps>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: CreateLazyComponentOptions = {}
): ComponentType<P> {
  const { loading, ssr = true, loadingHeight = '200px' } = options;

  return dynamic(importFn, {
    loading: () => (
      loading ?? <LazySkeletonFallback height={loadingHeight} />
    ) as React.ReactElement,
    ssr,
  }) as ComponentType<P>;
}

export const LazyComponents = {
  clientOnly: <P extends AnyProps>(
    importFn: () => Promise<{ default: ComponentType<P> }>,
    loadingHeight = '200px'
  ): ComponentType<P> => 
    createLazyComponent(importFn, { ssr: false, loadingHeight }),

  withSSR: <P extends AnyProps>(
    importFn: () => Promise<{ default: ComponentType<P> }>,
    loadingHeight = '200px'
  ): ComponentType<P> => 
    createLazyComponent(importFn, { ssr: true, loadingHeight }),

  withCustomLoading: <P extends AnyProps>(
    importFn: () => Promise<{ default: ComponentType<P> }>,
    loading: ReactNode
  ): ComponentType<P> => 
    createLazyComponent(importFn, { loading }),
};

export default LazyWrapper;
