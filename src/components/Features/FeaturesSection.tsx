"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import featuresData, {
  FEATURE_CATEGORIES,
  type FeatureCategory,
} from "@/data/features";
import { FeatureGrid } from "./FeatureGrid";
import styles from "@/styles/features.module.css";

const TAB_LABELS: Record<Exclude<FeatureCategory, "all">, string> = {
  security: "Security",
  payments: "Payments",
  trust: "Trust",
};

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<FeatureCategory>("all");

  const filteredFeatures = useMemo(() => {
    if (activeTab === "all") return featuresData;
    return featuresData.filter((f) => f.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="features"
      className={styles.featuresSection}
      aria-labelledby="features-heading"
    >
      <div className={styles.featuresContainer}>
        <motion.header
          className={styles.featuresHeader}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <h2 id="features-heading" className={styles.featuresTitle}>
            Why SafeTrust
          </h2>
          <p className={styles.featuresSubtitle}>
            Key benefits for secure, transparent transactions
          </p>
        </motion.header>

        <motion.div
          className={styles.tabsWrapper}
          role="tablist"
          aria-label="Feature categories"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {FEATURE_CATEGORIES.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="features-panel"
              id={`tab-${tab}`}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "All" : TAB_LABELS[tab]}
            </button>
          ))}
        </motion.div>

        <div
          id="features-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <FeatureGrid features={filteredFeatures} />
        </div>
      </div>
    </section>
  );
}
