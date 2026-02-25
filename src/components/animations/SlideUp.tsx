import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { animationPresets } from "../../lib/animations/presets";
import { springConfigs } from "../../lib/animations/spring-configs";

interface SlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  yOffset?: number;
  useSpring?: boolean;
  children: React.ReactNode;
}

export const SlideUp: React.FC<SlideUpProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  useSpring = false,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If using spring, override the default duration-based transition
  const transition = shouldReduceMotion
    ? { duration: 0, delay: 0 }
    : useSpring
      ? { ...springConfigs.gentle, delay }
      : { duration, delay, ease: "easeOut" };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : yOffset }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : yOffset }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};
