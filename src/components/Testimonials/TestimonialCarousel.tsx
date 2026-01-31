"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
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

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, testimonials.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
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
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrev();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  // Get visible testimonials (circular)
  const getVisibleTestimonials = () => {
    const visible: { testimonial: Testimonial; index: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ testimonial: testimonials[index], index });
    }
    return visible;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      className={styles.carouselContainer}
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

      {/* Fade edges */}
      <div className={cn(styles.fadeEdge, styles.fadeEdgeLeft)} />
      <div className={cn(styles.fadeEdge, styles.fadeEdgeRight)} />

      {/* Carousel track */}
      <div className={styles.carouselWrapper}>
        <motion.div
          className="flex gap-4 px-8"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex gap-4 w-full"
            >
              {getVisibleTestimonials().map(({ testimonial, index }, i) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "flex-shrink-0",
                    visibleCount === 1 && "w-full",
                    visibleCount === 2 && "w-[calc(50%-0.5rem)]",
                    visibleCount === 3 && "w-[calc(33.333%-0.667rem)]"
                  )}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={i === 0}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div
        className={styles.dotsContainer}
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              styles.dot,
              index === currentIndex && styles.dotActive
            )}
            onClick={() => goToIndex(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <p className={styles.swipeHint}>Swipe to see more testimonials</p>
    </div>
  );
};

export default TestimonialCarousel;
