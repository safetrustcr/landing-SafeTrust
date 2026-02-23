"use client";

import React from "react";
import { FeatureCard } from "./FeatureCard";
import type { Feature } from "./FeatureCard";
import styles from "@/styles/features.module.css";

interface FeatureGridProps {
  features: Feature[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div
      className={styles.featureGrid}
      role="list"
      aria-label="SafeTrust features"
    >
      {features.map((feature, index) => (
        <div key={feature.id} role="listitem">
          <FeatureCard feature={feature} index={index} />
        </div>
      ))}
    </div>
  );
}
