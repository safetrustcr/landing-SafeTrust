"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  DollarSign,
  Clock,
  Brain,
  Link2,
  LucideIcon,
} from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

export function AnimatedIcon({
  icon: Icon,
  size = 28,
  className = "text-primary",
  isHovered = false,
}: AnimatedIconProps) {
  return (
    <motion.div
      className="feature-icon inline-flex items-center justify-center"
      initial={{ scale: 1, rotate: 0 }}
      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <Icon size={size} className={className} />
    </motion.div>
  );
}

// Pre-configured animated icons for easy use
export function AnimatedGlobe(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={Globe} {...props} />;
}

export function AnimatedShieldCheck(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={ShieldCheck} {...props} />;
}

export function AnimatedDollarSign(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={DollarSign} {...props} />;
}

export function AnimatedClock(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={Clock} {...props} />;
}

export function AnimatedBrain(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={Brain} {...props} />;
}

export function AnimatedLink2(props: Omit<AnimatedIconProps, "icon">) {
  return <AnimatedIcon icon={Link2} {...props} />;
}
