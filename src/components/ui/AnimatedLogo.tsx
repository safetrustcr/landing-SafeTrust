"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import type { AnimatedLogoProps } from "@/types/logo";

/**
 * Animated SafeTrust logo wrapper.
 * - Hover: gentle scale and float
 * - Loading: rotating ring + soft pulse
 */
export function AnimatedLogo({
  size = "md",
  animated = true,
  loading = false,
  className,
  "aria-label": ariaLabel,
}: AnimatedLogoProps) {
  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
      initial={{ scale: 1, opacity: 1 }}
      whileHover={animated ? { scale: 1.04, y: -1 } : undefined}
      whileTap={animated ? { scale: 0.96, y: 0 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {/* Base logo */}
      <Logo size={size} animated={false} aria-label={ariaLabel} className="relative z-10" />

      {/* Optional loading ring (rotates around the logo) */}
      {loading && (
        <motion.span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        >
          <svg width="110%" height="110%" viewBox="0 0 100 100" className="text-primary/70">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="60 300"
            />
          </svg>
        </motion.span>
      )}

      {/* Soft breathing glow when loading */}
      {loading && (
        <motion.span
          aria-hidden
          className="absolute -z-0 h-[140%] w-[140%] rounded-full bg-primary/10 blur-2xl"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

export default AnimatedLogo;
