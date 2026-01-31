"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Shield, Lock, Globe, Zap, CheckCircle, Eye } from "lucide-react";
import styles from "@/styles/hero.module.css";

interface TrustBadge {
  id: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  color: "green" | "blue" | "purple" | "cyan" | "amber";
}

const defaultBadges: TrustBadge[] = [
  {
    id: "secure",
    icon: <Shield className="w-5 h-5" />,
    label: "Secure Escrow",
    description: "Bank-grade protection",
    color: "green",
  },
  {
    id: "decentralized",
    icon: <Globe className="w-5 h-5" />,
    label: "Decentralized",
    description: "No single point of failure",
    color: "blue",
  },
  {
    id: "transparent",
    icon: <Eye className="w-5 h-5" />,
    label: "Transparent",
    description: "Full transaction visibility",
    color: "purple",
  },
  {
    id: "fast",
    icon: <Zap className="w-5 h-5" />,
    label: "Lightning Fast",
    description: "Instant settlements",
    color: "amber",
  },
];

interface TrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
  variant?: "horizontal" | "grid";
  showDescriptions?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export function TrustBadges({ 
  badges = defaultBadges, 
  className = "",
  variant = "horizontal",
  showDescriptions = false,
}: TrustBadgesProps) {
  const prefersReducedMotion = useReducedMotion();

  const colorClasses = {
    green: {
      bg: "bg-green-500/10 dark:bg-green-500/20",
      border: "border-green-500/20 dark:border-green-500/30",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500 dark:text-green-400",
      glow: "shadow-green-500/20",
    },
    blue: {
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      border: "border-blue-500/20 dark:border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500 dark:text-blue-400",
      glow: "shadow-blue-500/20",
    },
    purple: {
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      border: "border-purple-500/20 dark:border-purple-500/30",
      text: "text-purple-600 dark:text-purple-400",
      icon: "text-purple-500 dark:text-purple-400",
      glow: "shadow-purple-500/20",
    },
    cyan: {
      bg: "bg-cyan-500/10 dark:bg-cyan-500/20",
      border: "border-cyan-500/20 dark:border-cyan-500/30",
      text: "text-cyan-600 dark:text-cyan-400",
      icon: "text-cyan-500 dark:text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
    amber: {
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      border: "border-amber-500/20 dark:border-amber-500/30",
      text: "text-amber-600 dark:text-amber-400",
      icon: "text-amber-500 dark:text-amber-400",
      glow: "shadow-amber-500/20",
    },
  };

  const containerClasses = variant === "horizontal" 
    ? "flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6"
    : "grid grid-cols-2 sm:grid-cols-4 gap-4";

  if (prefersReducedMotion) {
    return (
      <div className={`${containerClasses} ${className}`} role="list" aria-label="Trust indicators">
        {badges.map((badge) => (
          <Badge 
            key={badge.id} 
            badge={badge} 
            colorClasses={colorClasses[badge.color]}
            showDescription={showDescriptions}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${containerClasses} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="list"
      aria-label="Trust indicators"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          variants={badgeVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          className={styles.badgeWrapper}
        >
          <Badge 
            badge={badge} 
            colorClasses={colorClasses[badge.color]}
            showDescription={showDescriptions}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

interface BadgeProps {
  badge: TrustBadge;
  colorClasses: {
    bg: string;
    border: string;
    text: string;
    icon: string;
    glow: string;
  };
  showDescription?: boolean;
}

function Badge({ badge, colorClasses, showDescription = false }: BadgeProps) {
  return (
    <div
      className={`
        flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3
        rounded-full border backdrop-blur-sm
        ${colorClasses.bg} ${colorClasses.border}
        hover:shadow-lg ${colorClasses.glow}
        transition-shadow duration-300
        ${styles.trustBadge}
      `}
      role="listitem"
    >
      <div className={`flex-shrink-0 ${colorClasses.icon}`} aria-hidden="true">
        {badge.icon}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm sm:text-base font-medium ${colorClasses.text}`}>
          {badge.label}
        </span>
        {showDescription && badge.description && (
          <span className="text-xs text-muted-foreground dark:text-gray-500 hidden sm:block">
            {badge.description}
          </span>
        )}
      </div>
    </div>
  );
}

// Simplified trust badges for compact display
export function TrustBadgesCompact({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  const compactBadges = [
    { icon: <Shield className="w-4 h-4" />, label: "Bank-Grade Security", color: "text-green-400" },
    { icon: <Lock className="w-4 h-4" />, label: "End-to-End Encrypted", color: "text-blue-400" },
    { icon: <CheckCircle className="w-4 h-4" />, label: "USDT Protected", color: "text-amber-400" },
  ];

  return (
    <motion.div
      className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {compactBadges.map((badge, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2 text-muted-foreground dark:text-gray-400"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
        >
          <span className={badge.color} aria-hidden="true">
            {badge.icon}
          </span>
          <span className="text-sm font-medium">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Stats badges showing platform metrics
interface StatBadge {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
}

export function StatsBadges({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  const stats: StatBadge[] = [
    { value: "$50M+", label: "Total Volume", trend: "up" },
    { value: "10K+", label: "Active Users", trend: "up" },
    { value: "99.9%", label: "Uptime", trend: "neutral" },
    { value: "0", label: "Security Breaches", trend: "neutral" },
  ];

  return (
    <motion.div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center p-4 rounded-xl bg-card/50 dark:bg-white/5 border border-border/50 dark:border-white/10 backdrop-blur-sm"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        >
          <div className="text-2xl sm:text-3xl font-bold text-primary">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TrustBadges;
