"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, ExternalLink } from "lucide-react";
import styles from "@/styles/hero.module.css";

interface CTAButtonsProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
  onWatchDemo?: () => void;
  className?: string;
}

export function CTAButtons({ 
  onGetStarted, 
  onLearnMore, 
  onWatchDemo,
  className = "" 
}: CTAButtonsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleGetStarted = () => {
    onGetStarted?.();
    // Default behavior: smooth scroll to features section
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMore = () => {
    onLearnMore?.();
    // Default behavior: smooth scroll to how-it-works section
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchDemo = () => {
    onWatchDemo?.();
    // Could open a modal with demo video
    console.log("Watch demo clicked");
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: prefersReducedMotion ? 1 : 1.02 },
    tap: { scale: prefersReducedMotion ? 1 : 0.98 },
  };

  return (
    <motion.div 
      className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Primary CTA - Get Started */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton("getStarted")}
        onHoverEnd={() => setHoveredButton(null)}
        className="relative group"
      >
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-400 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300 ${styles.buttonGlow}`} />
        
        <button
          onClick={handleGetStarted}
          className={`
            relative flex items-center gap-3 px-8 py-4 
            bg-gradient-to-r from-primary to-blue-600 
            hover:from-blue-600 hover:to-primary
            text-white font-semibold text-lg rounded-xl
            shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            ${styles.primaryCTA}
          `}
          aria-label="Get started with SafeTrust"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <span>Get Started</span>
          <motion.div
            animate={hoveredButton === "getStarted" ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 0.6, repeat: hoveredButton === "getStarted" ? Infinity : 0 }}
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        </button>
      </motion.div>

      {/* Secondary CTA - Learn More */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton("learnMore")}
        onHoverEnd={() => setHoveredButton(null)}
      >
        <button
          onClick={handleLearnMore}
          className={`
            flex items-center gap-3 px-8 py-4
            bg-transparent 
            border-2 border-foreground/20 hover:border-primary/50
            dark:border-white/20 dark:hover:border-primary/50
            text-foreground dark:text-white font-semibold text-lg rounded-xl
            hover:bg-primary/5 dark:hover:bg-primary/10
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            ${styles.secondaryCTA}
          `}
          aria-label="Learn more about SafeTrust"
        >
          <span>Learn More</span>
          <motion.div
            animate={hoveredButton === "learnMore" ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 0.6, repeat: hoveredButton === "learnMore" ? Infinity : 0 }}
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        </button>
      </motion.div>

      {/* Tertiary CTA - Watch Demo */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setHoveredButton("watchDemo")}
        onHoverEnd={() => setHoveredButton(null)}
        className="hidden lg:block"
      >
        <button
          onClick={handleWatchDemo}
          className={`
            flex items-center gap-2 px-6 py-4
            text-muted-foreground hover:text-foreground
            dark:text-gray-400 dark:hover:text-white
            font-medium text-lg
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg
            group
          `}
          aria-label="Watch SafeTrust demo video"
        >
          <motion.div 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors"
            animate={hoveredButton === "watchDemo" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6, repeat: hoveredButton === "watchDemo" ? Infinity : 0 }}
          >
            <Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" aria-hidden="true" />
          </motion.div>
          <span>Watch Demo</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

// Single CTA button component for reuse
interface CTAButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

export function CTAButton({
  variant = "primary",
  icon,
  children,
  onClick,
  href,
  className = "",
  ariaLabel,
  external = false,
}: CTAButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = `
    flex items-center gap-2 font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
  `;

  const variantStyles = {
    primary: `
      px-8 py-4 text-lg
      bg-gradient-to-r from-primary to-blue-600 
      hover:from-blue-600 hover:to-primary
      text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30
    `,
    secondary: `
      px-8 py-4 text-lg
      bg-transparent border-2 border-foreground/20 hover:border-primary/50
      dark:border-white/20 dark:hover:border-primary/50
      text-foreground dark:text-white
      hover:bg-primary/5 dark:hover:bg-primary/10
    `,
    ghost: `
      px-6 py-3 text-base
      text-muted-foreground hover:text-foreground
      dark:text-gray-400 dark:hover:text-white
    `,
  };

  const buttonContent = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {external && <ExternalLink className="w-4 h-4" aria-hidden="true" />}
    </>
  );

  const buttonProps = {
    className: `${baseStyles} ${variantStyles[variant]} ${className}`,
    "aria-label": ariaLabel,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...buttonProps}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      {...buttonProps}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
}

export default CTAButtons;
