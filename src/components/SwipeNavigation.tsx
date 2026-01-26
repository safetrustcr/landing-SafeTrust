'use client';

import React, { useState } from 'react';
import { useSwipe } from '@/hooks/use-touch-gestures';

export interface SwipeNavigationProps {
  sections: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  initialSection?: number;
  onChange?: (sectionIndex: number) => void;
  className?: string;
}

export const SwipeNavigation: React.FC<SwipeNavigationProps> = ({
  sections,
  initialSection = 0,
  onChange,
  className = '',
}) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSection = (index: number) => {
    if (index < 0 || index >= sections.length || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSection(index);
    onChange?.(index);

    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      goToSection(currentSection + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      goToSection(currentSection - 1);
    }
  };

  const { handlers } = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    minDistance: 50,
    minVelocity: 0.3,
  });

  return (
    <div className={`swipe-navigation ${className}`} {...handlers}>
      {/* Progress Indicators */}
      <div className="section-indicators">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`indicator ${index === currentSection ? 'active' : ''}`}
            onClick={() => goToSection(index)}
            aria-label={`Go to ${section.title}`}
          >
            <span className="indicator-dot" />
          </button>
        ))}
      </div>

      {/* Section Container */}
      <div className="sections-container">
        <div
          className="sections-wrapper"
          style={{
            transform: `translateX(-${currentSection * 100}%)`,
            transition: isTransitioning ? 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {sections.map((section) => (
            <div key={section.id} className="section">
              <h2 className="section-title">{section.title}</h2>
              <div className="section-content">{section.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (for desktop) */}
      <div className="nav-arrows">
        {currentSection > 0 && (
          <button
            className="nav-arrow left"
            onClick={goToPrevious}
            aria-label="Previous section"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {currentSection < sections.length - 1 && (
          <button
            className="nav-arrow right"
            onClick={goToNext}
            aria-label="Next section"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Swipe Hint (shows on first load) */}
      <div className="swipe-hint">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span>Swipe to navigate</span>
      </div>

      <style jsx>{`
        .swipe-navigation {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          touch-action: pan-y pinch-zoom;
          user-select: none;
        }

        .section-indicators {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .indicator {
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 200ms ease-out;
        }

        .indicator:hover {
          transform: scale(1.2);
        }

        .indicator-dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ccc;
          transition: all 200ms ease-out;
        }

        .indicator.active .indicator-dot {
          background: #336AD9;
          width: 24px;
          border-radius: 4px;
        }

        .sections-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .sections-wrapper {
          display: flex;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .section {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          padding: 80px 20px 20px;
          overflow-y: auto;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1a1a1a;
        }

        .section-content {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
        }

        .nav-arrows {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 10;
        }

        .nav-arrow {
          position: absolute;
          top: 0;
          padding: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: all;
          transition: all 200ms ease-out;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-arrow:hover {
          background: #fff;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-arrow.left {
          left: 20px;
        }

        .nav-arrow.right {
          right: 20px;
        }

        .swipe-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(51, 106, 217, 0.9);
          color: white;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 500;
          animation: swipe-hint-fade 3s ease-out forwards;
          pointer-events: none;
        }

        @keyframes swipe-hint-fade {
          0%, 70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .section-indicators {
            top: auto;
            bottom: 20px;
          }

          .section {
            padding: 60px 16px 100px;
          }

          .section-title {
            font-size: 24px;
          }

          .nav-arrows {
            display: none;
          }
        }

        /* Hide navigation on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .nav-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SwipeNavigation;