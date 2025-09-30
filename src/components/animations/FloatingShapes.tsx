'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'
import { brandColors, animationPresets } from '@/lib/animation-utils'

interface FloatingShape {
  id: string
  type: 'circle' | 'triangle' | 'square'
  size: number
  x: number
  y: number
  color: string
  delay: number
  duration: number
}

interface FloatingShapesProps {
  count?: number
  intensity?: 'low' | 'medium' | 'high'
  className?: string
  colors?: string[]
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({
  count = 15,
  intensity = 'medium',
  className = '',
  colors = [
    brandColors.primary.light,
    brandColors.secondary.light,
    brandColors.accent.light
  ]
}) => {
  const capabilities = useDeviceCapabilities()
  const { animationQuality, shouldReduceAnimations } = useAdaptiveAnimation()

  // Generate random shapes based on device capabilities
  const shapes = useMemo(() => {
    const shapeCount = capabilities.isLowEndDevice ? Math.min(count, 8) : count
    const generatedShapes: FloatingShape[] = []

    for (let i = 0; i < shapeCount; i++) {
      const types: ('circle' | 'triangle' | 'square')[] = ['circle', 'triangle', 'square']
      const type = types[Math.floor(Math.random() * types.length)]
      
      generatedShapes.push({
        id: `shape-${i}`,
        type,
        size: Math.random() * 60 + 20, // 20-80px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 3 // 3-7 seconds
      })
    }

    return generatedShapes
  }, [count, colors, capabilities.isLowEndDevice])

  // Animation variants based on performance
  const getAnimationVariants = () => {
    if (shouldReduceAnimations) {
      return {
        animate: {
          y: [-5, 5, -5],
          rotate: [0, 180, 360],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      }
    }

    return {
      animate: {
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  }

  // Render individual shape
  const renderShape = (shape: FloatingShape) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: shape.size,
      height: shape.size,
      opacity: intensity === 'low' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7,
      zIndex: 1
    }

    const animationVariants = getAnimationVariants()

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              backgroundColor: shape.color,
              filter: 'blur(1px)'
            }}
            variants={animationVariants}
            initial={{ opacity: 0, scale: 0 }}
            animate="animate"
            transition={{ delay: shape.delay }}
          />
        )

      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              backgroundColor: 'transparent',
              filter: 'blur(1px)'
            }}
            variants={animationVariants}
            initial={{ opacity: 0, scale: 0 }}
            animate="animate"
            transition={{ delay: shape.delay }}
          />
        )

      case 'square':
        return (
          <motion.div
            key={shape.id}
            style={{
              ...baseStyle,
              backgroundColor: shape.color,
              filter: 'blur(1px)'
            }}
            variants={animationVariants}
            initial={{ opacity: 0, scale: 0 }}
            animate="animate"
            transition={{ delay: shape.delay }}
          />
        )

      default:
        return null
    }
  }

  // Don't render on low-end devices if performance is critical
  if (capabilities.isLowEndDevice && animationQuality === 'low') {
    return null
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map(renderShape)}
      
      {/* Additional gradient overlays for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      {/* Subtle particle effect */}
      {!shouldReduceAnimations && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 80%, ${brandColors.primary.light}15 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${brandColors.secondary.light}15 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, ${brandColors.accent.light}10 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  )
}

export default FloatingShapes
