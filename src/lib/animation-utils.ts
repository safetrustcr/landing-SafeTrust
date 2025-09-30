import { Variants } from 'framer-motion'

// Animation presets for different elements
export const animationPresets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  
  scaleInBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { opacity: 0, scale: 0.3 }
  },
  
  // Floating animations
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  floatSlow: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  // Rotation animations
  rotate: {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  
  // Stagger animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
} as const

// Easing functions
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: "spring", stiffness: 300, damping: 30 }
} as const

// Mobile-specific animation settings
export const mobileOptimizations = {
  // Reduce animation complexity on mobile
  reducedMotion: {
    duration: 0.3,
    ease: "easeOut"
  },
  
  // Performance-optimized settings
  performance: {
    duration: 0.2,
    ease: "easeOut"
  },
  
  // Battery-efficient settings
  battery: {
    duration: 0.4,
    ease: "easeOut",
    willChange: "transform"
  }
} as const

// Animation timing presets
export const timing = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2
} as const

// SafeTrust brand colors for animations
export const brandColors = {
  primary: {
    light: "#3b82f6", // blue-500
    dark: "#1d4ed8"   // blue-700
  },
  secondary: {
    light: "#8b5cf6", // violet-500
    dark: "#7c3aed"    // violet-600
  },
  accent: {
    light: "#06b6d4", // cyan-500
    dark: "#0891b2"    // cyan-600
  }
} as const

// Performance monitoring utilities
export const performanceUtils = {
  // Check if device supports high-performance animations
  isHighPerformanceDevice: (): boolean => {
    if (typeof window === 'undefined') return true
    
    // Check for hardware acceleration support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    // Check memory and CPU capabilities
    const memory = (navigator as any).deviceMemory || 4
    const cores = navigator.hardwareConcurrency || 4
    
    return !!(gl && memory >= 4 && cores >= 4)
  },
  
  // Get optimal animation settings based on device
  getOptimalSettings: () => {
    const isHighPerf = performanceUtils.isHighPerformanceDevice()
    const isMobile = window.innerWidth <= 768
    
    if (isMobile && !isHighPerf) {
      return mobileOptimizations.performance
    } else if (isMobile) {
      return mobileOptimizations.battery
    } else {
      return { duration: timing.normal, ease: easing.easeOut }
    }
  },
  
  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
  
  // Debounce function for resize events
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }
}

// Animation variants for common use cases
export const commonVariants: Record<string, Variants> = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  // Modal animations
  modal: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  
  // Button hover effects
  buttonHover: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },
  
  // Card animations
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2 } }
  }
}

// Utility function to create staggered animations
export const createStaggerVariants = (
  staggerDelay: number = 0.1,
  itemDelay: number = 0.1
) => ({
  container: {
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: itemDelay }
    }
  }
})

// Utility function to create scroll-triggered animations
export const createScrollVariants = (
  threshold: number = 0.1,
  once: boolean = true
) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easing.easeOut }
  },
  viewport: { 
    once, 
    amount: threshold 
  }
})
