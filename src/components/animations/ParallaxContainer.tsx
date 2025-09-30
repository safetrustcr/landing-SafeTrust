'use client'

import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'
import { performanceUtils } from '@/lib/animation-utils'

interface ParallaxContainerProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  threshold?: number
  once?: boolean
}

interface ParallaxLayerProps {
  children: React.ReactNode
  speed: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

// Main Parallax Container
const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  threshold = 0.1,
  once = true
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once
  })
  
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  // Create transform based on direction and speed
  const y = useTransform(scrollY, [0, 1000], [0, direction === 'up' ? -1000 * speed : direction === 'down' ? 1000 * speed : 0])
  const x = useTransform(scrollY, [0, 1000], [0, direction === 'left' ? -1000 * speed : direction === 'right' ? 1000 * speed : 0])

  // Disable parallax on low-end devices or when reduced motion is preferred
  if (capabilities.isLowEndDevice || shouldReduceAnimations) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Individual Parallax Layer
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  direction = 'up',
  className = ''
}) => {
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  // Create smooth spring animation
  const springY = useSpring(
    useTransform(scrollY, [0, 1000], [0, -1000 * speed]),
    { stiffness: 100, damping: 30 }
  )

  const springX = useSpring(
    useTransform(scrollY, [0, 1000], [0, -1000 * speed]),
    { stiffness: 100, damping: 30 }
  )

  // Disable parallax on low-end devices
  if (capabilities.isLowEndDevice || shouldReduceAnimations) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      style={{
        y: direction === 'up' || direction === 'down' ? springY : 0,
        x: direction === 'left' || direction === 'right' ? springX : 0
      }}
    >
      {children}
    </motion.div>
  )
}

// Multi-layer Parallax Container
interface MultiLayerParallaxProps {
  layers: Array<{
    children: React.ReactNode
    speed: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
  }>
  className?: string
}

export const MultiLayerParallax: React.FC<MultiLayerParallaxProps> = ({
  layers,
  className = ''
}) => {
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  // Disable multi-layer parallax on low-end devices
  if (capabilities.isLowEndDevice || shouldReduceAnimations) {
    return (
      <div className={className}>
        {layers.map((layer, index) => (
          <div key={index} className={layer.className}>
            {layer.children}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={layer.speed}
          direction={layer.direction}
          className={layer.className}
        >
          {layer.children}
        </ParallaxLayer>
      ))}
    </div>
  )
}

// Scroll-triggered Animation Hook
export const useScrollAnimation = (threshold: number = 0.1) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  })
  
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  const y = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return {
    ref,
    inView,
    scrollY: shouldReduceAnimations ? 0 : y,
    opacity: shouldReduceAnimations ? 1 : opacity,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Performance-optimized scroll listener
export const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  useEffect(() => {
    if (capabilities.isLowEndDevice || shouldReduceAnimations) {
      return
    }

    const throttledCallback = performanceUtils.throttle(callback, 16) // 60fps

    const handleScroll = () => {
      throttledCallback(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, capabilities.isLowEndDevice, shouldReduceAnimations])
}

export default ParallaxContainer
