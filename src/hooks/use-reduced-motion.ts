'use client'

import { useState, useEffect } from 'react'

interface ReducedMotionReturn {
  prefersReducedMotion: boolean
  isDisabled: boolean
  shouldReduceAnimations: boolean
}

// Main reduced motion hook
export const useReducedMotion = (): ReducedMotionReturn => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    setIsDisabled(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
      setIsDisabled(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    prefersReducedMotion,
    isDisabled,
    shouldReduceAnimations: prefersReducedMotion
  }
}

// Accessibility preferences hook
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false
  })

  useEffect(() => {
    // Reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPreferences(prev => ({
      ...prev,
      reducedMotion: motionQuery.matches
    }))

    // High contrast
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    setPreferences(prev => ({
      ...prev,
      highContrast: contrastQuery.matches
    }))

    // Large text
    const textQuery = window.matchMedia('(prefers-reduced-data: reduce)')
    setPreferences(prev => ({
      ...prev,
      largeText: textQuery.matches
    }))

    // Screen reader detection (basic)
    const hasScreenReader = window.speechSynthesis !== undefined
    setPreferences(prev => ({
      ...prev,
      screenReader: hasScreenReader
    }))

    // Listen for changes
    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: event.matches
      }))
    }

    const handleContrastChange = (event: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        highContrast: event.matches
      }))
    }

    motionQuery.addEventListener('change', handleMotionChange)
    contrastQuery.addEventListener('change', handleContrastChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
    }
  }, [])

  return preferences
}

// Animation fallback hook
export const useAnimationFallback = () => {
  const { prefersReducedMotion } = useReducedMotion()
  const [fallbackMode, setFallbackMode] = useState(false)

  useEffect(() => {
    setFallbackMode(prefersReducedMotion)
  }, [prefersReducedMotion])

  // Get fallback animation settings
  const getFallbackSettings = () => {
    if (fallbackMode) {
      return {
        duration: 0,
        ease: 'linear',
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0
      }
    }
    return null
  }

  // Get reduced animation settings
  const getReducedSettings = () => {
    if (prefersReducedMotion) {
      return {
        duration: 0.1,
        ease: 'easeOut',
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0
      }
    }
    return null
  }

  return {
    fallbackMode,
    getFallbackSettings,
    getReducedSettings,
    shouldDisableAnimations: prefersReducedMotion
  }
}

// Motion-safe animation hook
export const useMotionSafeAnimation = () => {
  const { prefersReducedMotion } = useReducedMotion()
  const [isMotionSafe, setIsMotionSafe] = useState(true)

  useEffect(() => {
    setIsMotionSafe(!prefersReducedMotion)
  }, [prefersReducedMotion])

  // Get motion-safe animation variants
  const getMotionSafeVariants = (variants: any) => {
    if (!isMotionSafe) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 }
      }
    }
    return variants
  }

  // Get motion-safe transition
  const getMotionSafeTransition = (transition: any) => {
    if (!isMotionSafe) {
      return { duration: 0 }
    }
    return transition
  }

  return {
    isMotionSafe,
    getMotionSafeVariants,
    getMotionSafeTransition
  }
}

// Export all hooks
export {
  type ReducedMotionReturn
}
