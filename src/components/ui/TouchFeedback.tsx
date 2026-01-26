// src/components/ui/TouchFeedback.tsx

'use client';

import React, { useState, useRef, useCallback } from 'react';

export interface TouchFeedbackProps {
    children: React.ReactNode;
    color?: string;
    duration?: number;
    opacity?: number;
    disabled?: boolean;
    className?: string;
    haptic?: boolean;
}

export const TouchFeedback: React.FC<TouchFeedbackProps> = ({
    children,
    color = 'rgba(51, 106, 217, 0.3)',
    duration = 600,
    opacity = 0.3,
    disabled = false,
    className = '',
    haptic = false,
}) => {
    const [ripples, setRipples] = useState<Array<{
        x: number;
        y: number;
        size: number;
        id: number;
    }>>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(0);

    const triggerHaptic = useCallback(() => {
        if (haptic && 'vibrate' in navigator) {
            navigator.vibrate(10); // Very short haptic feedback
        }
    }, [haptic]);

    const createRipple = useCallback(
        (event: React.TouchEvent | React.MouseEvent) => {
            if (disabled || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;

            let x: number, y: number;

            if ('touches' in event && event.touches.length > 0) {
                x = event.touches[0].clientX - rect.left;
                y = event.touches[0].clientY - rect.top;
            } else {
                x = (event as React.MouseEvent).clientX - rect.left;
                y = (event as React.MouseEvent).clientY - rect.top;
            }

            const ripple = {
                x,
                y,
                size,
                id: nextId.current++,
            };

            setRipples((prev) => [...prev, ripple]);
            triggerHaptic();

            // Remove ripple after animation
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }, duration);
        },
        [disabled, duration, triggerHaptic]
    );

    const handleTouchStart = useCallback(
        (event: React.TouchEvent) => {
            createRipple(event);
        },
        [createRipple]
    );

    const handleMouseDown = useCallback(
        (event: React.MouseEvent) => {
            // Only trigger on left click for mouse
            if (event.button === 0) {
                createRipple(event);
            }
        },
        [createRipple]
    );

    return (
        <div
            ref={containerRef}
            className={`touch-feedback-container ${className}`}
            onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
            style={{
                position: 'relative',
                overflow: 'hidden',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
            }}
        >
            {children}

            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="touch-ripple"
                    style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: color,
                        opacity: opacity,
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%) scale(0)',
                        animation: `ripple-animation ${duration}ms ease-out`,
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}

            <style jsx>{`
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: ${opacity};
          }
          50% {
            opacity: ${opacity * 0.6};
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default TouchFeedback;