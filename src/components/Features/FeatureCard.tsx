"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "@/styles/features.module.css";
import type { Feature } from "@/data/features";

export type { Feature };

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showDetails = isHovered || isFocused;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const handleTouchEnd = useCallback(() => {
    setIsFocused((prev) => !prev);
  }, []);

  return (
    <motion.article
      className={styles.featureCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="article"
      aria-labelledby={`feature-title-${feature.id}`}
      aria-describedby={`feature-desc-${feature.id}`}
    >
      <div className={styles.featureIconWrapper}>
        <span className={styles.featureIcon}>{feature.icon}</span>
      </div>
      <h3 id={`feature-title-${feature.id}`} className={styles.featureTitle}>
        {feature.title}
      </h3>
      <p id={`feature-desc-${feature.id}`} className={styles.featureDescription}>
        {feature.description}
      </p>
      <AnimatePresence mode="wait">
        {showDetails && (
          <motion.div
            className={styles.featureDetails}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            role="region"
            aria-live="polite"
            aria-label={`More about ${feature.title}`}
          >
            <p className={styles.featureDetailsText}>{feature.details}</p>
            {feature.cta && feature.link && (
              <Link
                href={feature.link}
                className={styles.featureCta}
                tabIndex={showDetails ? 0 : -1}
              >
                {feature.cta}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
