'use client'

import { useEffect, useState, useCallback } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'
import { performanceUtils } from '@/lib/animation-utils'

interface ScrollAnimationOptions {
  threshold?: number
  once?: boolean
  offset?: number
  trigger?: 'top' | 'center' | 'bottom'
}

interface ScrollAnimationReturn {
  ref: (node?: Element | null) => void
  inView: boolean
  scrollY: any
  progress: any
  isVisible: boolean
  isDisabled: boolean
}

// Main scroll animation hook
export const useScrollAnimation = (options: ScrollAnimationOptions = {}): ScrollAnimationReturn => {
  const {
    threshold = 0.1,
    once = true,
    offset = 0,
    trigger = 'center'
  } = options

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: `${offset}px`
  })
  
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()
  
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    } else if (!once) {
      setIsVisible(false)
    }
  }, [inView, once])

  // Create smooth scroll-based transforms
  const scrollYTransform = useSpring(
    useTransform(scrollY, [0, 1000], [0, -100]),
    { stiffness: 100, damping: 30 }
  )

  const progress = useTransform(scrollY, [0, 1000], [0, 1])

  return {
    ref,
    inView,
    scrollY: shouldReduceAnimations ? 0 : scrollYTransform,
    progress: shouldReduceAnimations ? 0 : progress,
    isVisible,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Parallax scroll hook
export const useParallaxScroll = (speed: number = 0.5, direction: 'up' | 'down' = 'up') => {
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  const y = useSpring(
    useTransform(scrollY, [0, 1000], [0, direction === 'up' ? -1000 * speed : 1000 * speed]),
    { stiffness: 100, damping: 30 }
  )

  return {
    y: shouldReduceAnimations ? 0 : y,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Scroll progress hook
export const useScrollProgress = () => {
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  const progress = useTransform(scrollY, [0, 1000], [0, 1])
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (shouldReduceAnimations) {
      setScrollProgress(0)
      return
    }

    const unsubscribe = progress.onChange((value) => {
      setScrollProgress(value)
    })

    return unsubscribe
  }, [progress, shouldReduceAnimations])

  return {
    progress: shouldReduceAnimations ? 0 : scrollProgress,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Scroll direction hook
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  useEffect(() => {
    if (shouldReduceAnimations) return

    const updateScrollDirection = performanceUtils.throttle(() => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }, 100)

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [lastScrollY, shouldReduceAnimations])

  return {
    direction: shouldReduceAnimations ? 'down' : scrollDirection,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Scroll velocity hook
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0)
  const [lastTime, setLastTime] = useState(Date.now())
  const [lastScrollY, setLastScrollY] = useState(0)
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  useEffect(() => {
    if (shouldReduceAnimations) return

    const updateVelocity = performanceUtils.throttle(() => {
      const currentTime = Date.now()
      const currentScrollY = window.scrollY
      
      const timeDelta = currentTime - lastTime
      const scrollDelta = currentScrollY - lastScrollY
      
      const currentVelocity = Math.abs(scrollDelta / timeDelta) * 1000
      setVelocity(currentVelocity)
      
      setLastTime(currentTime)
      setLastScrollY(currentScrollY)
    }, 16)

    window.addEventListener('scroll', updateVelocity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateVelocity)
    }
  }, [lastTime, lastScrollY, shouldReduceAnimations])

  return {
    velocity: shouldReduceAnimations ? 0 : velocity,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Scroll-based animation trigger
export const useScrollTrigger = (triggerPoint: number = 0.5) => {
  const { ref, inView } = useInView({
    threshold: triggerPoint,
    triggerOnce: false
  })
  
  const { scrollY } = useScroll()
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    if (shouldReduceAnimations) {
      setIsTriggered(true)
      return
    }

    if (inView) {
      setIsTriggered(true)
    } else {
      setIsTriggered(false)
    }
  }, [inView, shouldReduceAnimations])

  return {
    ref,
    isTriggered,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Smooth scroll to element
export const useSmoothScroll = () => {
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    if (shouldReduceAnimations) {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'auto' })
      }
      return
    }

    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }, [shouldReduceAnimations])

  const scrollToTop = useCallback(() => {
    if (shouldReduceAnimations) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [shouldReduceAnimations])

  return {
    scrollToElement,
    scrollToTop,
    isDisabled: capabilities.isLowEndDevice || shouldReduceAnimations
  }
}

// Export all hooks
export {
  type ScrollAnimationOptions,
  type ScrollAnimationReturn
}
