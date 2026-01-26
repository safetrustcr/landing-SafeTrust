// src/components/ui/PullToRefresh.tsx

'use client';

import React from 'react';
import { usePullToRefresh } from '@/hooks/use-touch-gestures';

export interface PullToRefreshProps {
    children: React.ReactNode;
    onRefresh: () => Promise<void> | void;
    threshold?: number;
    resistance?: number;
    enabled?: boolean;
    className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
    children,
    onRefresh,
    threshold = 80,
    resistance = 2.5,
    enabled = true,
    className = '',
}) => {
    const { handlers, isPulling, isRefreshing, pullDistance, pullProgress } = usePullToRefresh({
        onRefresh,
        threshold,
        resistance,
        enabled,
    });

    return (
        <div className={`pull-to-refresh-container ${className}`} {...handlers}>
            {/* Pull Indicator */}
            <div
                className={`pull-to-refresh-indicator ${isPulling || isRefreshing ? 'active' : ''}`}
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    opacity: pullProgress,
                }}
            >
                <div className={`refresh-icon ${isRefreshing ? 'spinning' : ''}`}>
                    {isRefreshing ? (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    ) : (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transform: `rotate(${pullProgress * 180}deg)`,
                                transition: 'transform 150ms ease-out',
                            }}
                        >
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    )}
                </div>
                <div className="refresh-text">
                    {isRefreshing
                        ? 'Refreshing...'
                        : pullProgress >= 1
                            ? 'Release to refresh'
                            : 'Pull to refresh'}
                </div>
            </div>

            {/* Content */}
            <div
                className="pull-to-refresh-content"
                style={{
                    transform: isPulling ? `translateY(${pullDistance}px)` : 'translateY(0)',
                    transition: isPulling ? 'none' : 'transform 300ms ease-out',
                }}
            >
                {children}
            </div>

            <style jsx>{`
        .pull-to-refresh-container {
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .pull-to-refresh-indicator {
          position: absolute;
          top: -60px;
          left: 0;
          right: 0;
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 200ms ease-out;
          pointer-events: none;
          z-index: 100;
        }

        .pull-to-refresh-indicator.active {
          opacity: 1;
        }

        .refresh-icon {
          width: 24px;
          height: 24px;
          color: #336AD9;
          transition: transform 150ms ease-out;
        }

        .refresh-icon.spinning {
          animation: spin 1s linear infinite;
        }

        .refresh-text {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .pull-to-refresh-content {
          position: relative;
          will-change: transform;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>

    );
};

export default PullToRefresh;