"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/data/testimonials";
import styles from "@/styles/testimonials.module.css";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine how many cards to show based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setVisibleCount(3);
        } else if (window.innerWidth >= 768) {
          setVisibleCount(2);
        } else {
          setVisibleCount(1);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, maxIndex]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Handle swipe gestures
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrev();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  const dotCount = maxIndex + 1;

  return (
    <div
      ref={containerRef}
      className={cn(styles.carouselContainer, "relative px-4 sm:px-8")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Customer testimonials carousel"
      aria-roledescription="carousel"
    >
      {/* Pause indicator */}
      {isPaused && (
        <div className={styles.pauseIndicator}>
          <Pause className="w-3 h-3 inline-block mr-1" />
          Paused
        </div>
      )}

      {/* Navigation buttons */}
      <button
        className={cn(styles.navButton, styles.navButtonPrev)}
        onClick={goToPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className={cn(styles.navButton, styles.navButtonNext)}
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel track */}
      <div className={cn(styles.carouselWrapper, "overflow-hidden py-6")}>
        <motion.div
          className="flex cursor-grab active:cursor-grabbing w-full"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((testimonial, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={testimonial.id}
                className={cn(
                  "flex-shrink-0 px-3 transition-all duration-500 select-none",
                  visibleCount === 1 && "w-full",
                  visibleCount === 2 && "w-1/2",
                  visibleCount === 3 && "w-1/3",
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${testimonials.length}`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div
        className={styles.dotsContainer}
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {Array.from({ length: dotCount }).map((_, index) => (
          <button
            key={index}
            className={cn(
              styles.dot,
              index === currentIndex && styles.dotActive,
            )}
            onClick={() => goToIndex(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <p className={styles.swipeHint}>Swipe to see more testimonials</p>
    </div>
  );
};

export default TestimonialCarousel;
