import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { animationPresets } from "../../lib/animations/presets";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const preset = animationPresets.fadeIn;

  // Create a transition object, respecting reduced motion
  const transition = {
    ...(preset.transition as any),
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};
