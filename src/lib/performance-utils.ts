import { useEffect, useState, useCallback } from 'react'

// Performance monitoring interface
interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  isLowPerformance: boolean
  batteryLevel?: number
}

// FPS monitoring utility
export const useFPSMonitor = () => {
  const [fps, setFps] = useState(60)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = (currentTime: number) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setFps(currentFPS)
        setIsLowPerformance(currentFPS < 30)
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return { fps, isLowPerformance }
}

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState(0)

  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const used = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        setMemoryUsage(Math.round(used * 100))
      }
    }

    const interval = setInterval(updateMemoryUsage, 1000)
    return () => clearInterval(interval)
  }, [])

  return memoryUsage
}

// Battery level monitoring
export const useBatteryMonitor = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)
  const [isCharging, setIsCharging] = useState<boolean | null>(null)

  useEffect(() => {
    if ('getBattery' in navigator) {
      ;(navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))
        setIsCharging(battery.charging)

        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100))
          setIsCharging(battery.charging)
        }

        battery.addEventListener('levelchange', updateBattery)
        battery.addEventListener('chargingchange', updateBattery)

        return () => {
          battery.removeEventListener('levelchange', updateBattery)
          battery.removeEventListener('chargingchange', updateBattery)
        }
      })
    }
  }, [])

  return { batteryLevel, isCharging }
}

// Combined performance monitoring hook
export const usePerformanceMonitor = (): PerformanceMetrics => {
  const { fps, isLowPerformance } = useFPSMonitor()
  const memoryUsage = useMemoryMonitor()
  const { batteryLevel } = useBatteryMonitor()

  return {
    fps,
    memoryUsage,
    isLowPerformance,
    batteryLevel: batteryLevel || undefined
  }
}

// Animation throttling utilities
export const useAnimationThrottle = (callback: () => void, delay: number = 16) => {
  const [isThrottled, setIsThrottled] = useState(false)

  const throttledCallback = useCallback(() => {
    if (!isThrottled) {
      callback()
      setIsThrottled(true)
      setTimeout(() => setIsThrottled(false), delay)
    }
  }, [callback, delay, isThrottled])

  return throttledCallback
}

// Performance-based animation quality adjustment
export const useAdaptiveAnimation = () => {
  const { fps, isLowPerformance, memoryUsage, batteryLevel } = usePerformanceMonitor()
  const [animationQuality, setAnimationQuality] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    // Determine animation quality based on performance metrics
    if (isLowPerformance || memoryUsage > 80 || (batteryLevel && batteryLevel < 20)) {
      setAnimationQuality('low')
    } else if (fps < 45 || memoryUsage > 60) {
      setAnimationQuality('medium')
    } else {
      setAnimationQuality('high')
    }
  }, [fps, isLowPerformance, memoryUsage, batteryLevel])

  return {
    animationQuality,
    shouldReduceAnimations: animationQuality === 'low',
    shouldOptimizeForBattery: batteryLevel && batteryLevel < 30
  }
}

// Device capability detection
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    supportsWebGL: false,
    supportsHardwareAcceleration: false,
    isMobile: false,
    isLowEndDevice: false
  })

  useEffect(() => {
    // WebGL support detection
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const supportsWebGL = !!gl

    // Hardware acceleration support
    const supportsHardwareAcceleration = supportsWebGL && 
      (gl as any).getExtension('WEBGL_lose_context') !== null

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768

    // Low-end device detection
    const memory = (navigator as any).deviceMemory || 4
    const cores = navigator.hardwareConcurrency || 4
    const isLowEndDevice = memory < 4 || cores < 4 || !supportsWebGL

    setCapabilities({
      supportsWebGL,
      supportsHardwareAcceleration,
      isMobile,
      isLowEndDevice
    })
  }, [])

  return capabilities
}

// Animation optimization utilities
export const animationOptimizations = {
  // Reduce animation complexity for low-end devices
  getOptimizedSettings: (quality: 'high' | 'medium' | 'low') => {
    switch (quality) {
      case 'low':
        return {
          duration: 0.2,
          ease: 'easeOut',
          willChange: 'transform',
          transform3d: true
        }
      case 'medium':
        return {
          duration: 0.3,
          ease: 'easeOut',
          willChange: 'transform',
          transform3d: true
        }
      case 'high':
      default:
        return {
          duration: 0.4,
          ease: 'easeInOut',
          willChange: 'auto',
          transform3d: false
        }
    }
  },

  // Get optimal frame rate based on device capabilities
  getOptimalFrameRate: (capabilities: ReturnType<typeof useDeviceCapabilities>) => {
    if (capabilities.isLowEndDevice) return 30
    if (capabilities.isMobile) return 45
    return 60
  },

  // Memory cleanup for animations
  cleanupAnimations: () => {
    // Cancel all running animations
    const elements = document.querySelectorAll('[data-animation]')
    elements.forEach(element => {
      const animations = element.getAnimations()
      animations.forEach(animation => animation.cancel())
    })
  }
}

// Performance warning system
export const usePerformanceWarnings = () => {
  const { fps, isLowPerformance, memoryUsage } = usePerformanceMonitor()
  const [warnings, setWarnings] = useState<string[]>([])

  useEffect(() => {
    const newWarnings: string[] = []

    if (fps < 30) {
      newWarnings.push('Low FPS detected. Consider reducing animation complexity.')
    }

    if (memoryUsage > 80) {
      newWarnings.push('High memory usage detected. Animations may be throttled.')
    }

    if (isLowPerformance) {
      newWarnings.push('Device performance is low. Animations have been optimized.')
    }

    setWarnings(newWarnings)
  }, [fps, isLowPerformance, memoryUsage])

  return warnings
}

// Export all utilities
export {
  type PerformanceMetrics
}
