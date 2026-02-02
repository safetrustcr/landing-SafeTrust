"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useHoverAnimation } from "@/hooks/use-hover-animation";
import { motion } from "framer-motion";
import "@/styles/card-animations.css";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  variant?: "large" | "small";
}

export function FeatureCard({
  icon,
  title,
  description,
  index,
  variant = "small",
}: FeatureCardProps) {
  const {
    isHovered,
    isTouched,
    transform,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    handleTouch,
    cardRef,
  } = useHoverAnimation();

  const minHeight = variant === "large" ? "min-h-[176px]" : "min-h-[144px]";
  const iconSize = variant === "large" ? "w-6 h-6" : "w-4 h-4";

  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card
        ref={cardRef}
        className={`
          feature-card-inner
          ${minHeight}
          bg-card
          border-border
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:border-primary/30
          cursor-pointer
          ${isTouched ? "touched" : ""}
        `}
        style={{
          transform: isHovered
            ? transform
            : isTouched
              ? "translateY(-8px)"
              : "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouch}
        tabIndex={0}
        role="article"
        aria-label={title}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTouch();
          }
        }}
      >
        {/* Glow effect overlay */}
        <div className="feature-card-glow" aria-hidden="true" />

        <CardContent className="p-6 flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="feature-icon">{icon}</div>
            <div
              className={`${iconSize} rounded-full bg-primary/10`}
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
