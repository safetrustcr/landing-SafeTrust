"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSearchIconProps {
  isActive?: boolean
  size?: number
  className?: string
  animationSpeed?: number
  onToggle?: () => void
}

export const AnimatedSearchIcon: React.FC<AnimatedSearchIconProps> = ({
  isActive = false,
  size = 24,
  className,
  animationSpeed = 300,
  onToggle,
}) => {
  const iconVariants = {
    inactive: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    active: {
      rotate: 45,
      scale: 1.1,
      transition: {
        duration: animationSpeed / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const handleClick = () => {
    onToggle?.()
  }

  return (
    <motion.div
      className={cn(
        "cursor-pointer inline-flex items-center justify-center",
        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "rounded-md transition-all duration-200",
        className
      )}
      variants={iconVariants}
      animate={isActive ? "active" : "inactive"}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={isActive ? "Close search" : "Open search"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current"
      >
        {/* Search glass circle */}
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isActive ? 0 : 1,
            scale: isActive ? 0.8 : 1,
          }}
          transition={{
            duration: animationSpeed / 1000,
            ease: "easeInOut",
          }}
        />
        
        {/* Search glass handle */}
        <motion.path
          d="m21 21-4.35-4.35"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isActive ? 0 : 1,
            scale: isActive ? 0.8 : 1,
          }}
          transition={{
            duration: animationSpeed / 1000,
            ease: "easeInOut",
          }}
        />
        
        {/* X lines */}
        <motion.line
          x1="8"
          y1="8"
          x2="16"
          y2="16"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
          }}
          transition={{
            duration: animationSpeed / 1000,
            ease: "easeInOut",
          }}
        />
        
        <motion.line
          x1="16"
          y1="8"
          x2="8"
          y2="16"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
          }}
          transition={{
            duration: animationSpeed / 1000,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}

export default AnimatedSearchIcon
