"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedSearchIcon } from "./AnimatedSearchIcon"

interface SearchToggleProps {
  onToggle?: (isActive: boolean) => void
  initialActive?: boolean
  size?: number
  className?: string
  animationSpeed?: number
  showLabel?: boolean
  labelPosition?: "left" | "right" | "top" | "bottom"
  disabled?: boolean
}

export const SearchToggle: React.FC<SearchToggleProps> = ({
  onToggle,
  initialActive = false,
  size = 24,
  className,
  animationSpeed = 300,
  showLabel = false,
  labelPosition = "right",
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(initialActive)

  const handleToggle = useCallback(() => {
    if (disabled) return
    
    const newActive = !isActive
    setIsActive(newActive)
    onToggle?.(newActive)
  }, [isActive, onToggle, disabled])

  const labelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const containerVariants = {
    inactive: {
      backgroundColor: "transparent",
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    active: {
      backgroundColor: "hsl(var(--accent))",
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const getLabelPositionClasses = () => {
    switch (labelPosition) {
      case "left":
        return "flex-row-reverse"
      case "right":
        return "flex-row"
      case "top":
        return "flex-col-reverse"
      case "bottom":
        return "flex-col"
      default:
        return "flex-row"
    }
  }

  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded-md p-2 transition-all duration-200",
        "hover:bg-accent/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        getLabelPositionClasses(),
        className
      )}
      variants={containerVariants}
      animate={isActive ? "active" : "inactive"}
    >
      <AnimatedSearchIcon
        isActive={isActive}
        size={size}
        animationSpeed={animationSpeed}
        onToggle={handleToggle}
        className={cn(
          "transition-colors duration-200",
          isActive ? "text-accent-foreground" : "text-foreground",
          disabled && "pointer-events-none"
        )}
      />
      
      {showLabel && (
        <AnimatePresence mode="wait">
          <motion.span
            key={isActive ? "close" : "search"}
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "text-sm font-medium whitespace-nowrap",
              isActive ? "text-accent-foreground" : "text-foreground"
            )}
          >
            {isActive ? "Close" : "Search"}
          </motion.span>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default SearchToggle
