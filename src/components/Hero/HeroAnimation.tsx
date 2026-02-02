"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import styles from "@/styles/hero.module.css";

interface HeroAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Container variants for staggered children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual item variants
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

// Headline character animation variants
const headlineCharVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

export function HeroAnimation({ children, delay = 0, className = "" }: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

// Animated headline component
interface AnimatedHeadlineProps {
  text: string;
  highlight?: string;
  className?: string;
  highlightClassName?: string;
}

export function AnimatedHeadline({ 
  text, 
  highlight, 
  className = "",
  highlightClassName = "" 
}: AnimatedHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });

  // Split text to identify highlight word
  const words = text.split(" ");
  const highlightIndex = highlight ? words.findIndex(w => w.toLowerCase() === highlight.toLowerCase()) : -1;

  if (prefersReducedMotion) {
    return (
      <h1 ref={ref} className={className}>
        {words.map((word, i) => (
          <span key={i}>
            {highlightIndex === i ? (
              <span className={highlightClassName}>{word}</span>
            ) : (
              word
            )}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      ref={ref}
      className={`${className} ${styles.headline}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={headlineCharVariants}
          className={`inline-block ${highlightIndex === i ? highlightClassName : ""}`}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// Animated subheading component
interface AnimatedSubheadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSubheading({ children, className = "", delay = 0.4 }: AnimatedSubheadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });

  if (prefersReducedMotion) {
    return <p ref={ref} className={className}>{children}</p>;
  }

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
      } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.p>
  );
}

// Floating particle effect component
export function FloatingParticles({ className = "" }: { className?: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0.5],
            y: [0, -100],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated item wrapper for staggered animations
export function AnimatedItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div 
      variants={itemVariants} 
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

// Glowing orb effect for background
export function GlowingOrb({ 
  className = "", 
  color = "primary",
  size = "lg",
  position = { x: 50, y: 50 }
}: { 
  className?: string; 
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  position?: { x: number; y: number };
}) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const colorClasses = {
    primary: "from-primary/30 to-blue-600/10",
    secondary: "from-purple-500/25 to-indigo-600/10",
    accent: "from-cyan-400/20 to-teal-500/10",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl bg-gradient-radial ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default HeroAnimation;
