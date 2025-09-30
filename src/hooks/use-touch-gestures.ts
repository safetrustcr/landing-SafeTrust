'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { useDeviceCapabilities } from '@/lib/performance-utils'

interface TouchGestureOptions {
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void
  onPinch?: (scale: number) => void
  onTap?: (event: any) => void
  onLongPress?: (event: any) => void
  onDrag?: (delta: { x: number; y: number }) => void
  threshold?: number
  preventDefault?: boolean
}

interface TouchGestureReturn {
  bind: any
  isGestureActive: boolean
  gestureData: {
    swipe?: { direction: string; velocity: number }
    pinch?: { scale: number; velocity: number }
    drag?: { delta: { x: number; y: number }; velocity: { x: number; y: number } }
  }
}

// Main touch gestures hook
export const useTouchGestures = (options: TouchGestureOptions = {}): TouchGestureReturn => {
  const {
    onSwipe,
    onPinch,
    onTap,
    onLongPress,
    onDrag,
    threshold = 10,
    preventDefault = true
  } = options

  const capabilities = useDeviceCapabilities()
  const [isGestureActive, setIsGestureActive] = useState(false)
  const [gestureData, setGestureData] = useState<any>({})

  // Don't bind gestures on desktop or low-end devices
  if (!capabilities.isMobile || capabilities.isLowEndDevice) {
    return {
      bind: {},
      isGestureActive: false,
      gestureData: {}
    }
  }

  const bind = useGesture(
    {
      onDrag: ({ delta, velocity, event }) => {
        if (preventDefault) event.preventDefault()
        
        setIsGestureActive(true)
        setGestureData(prev => ({
          ...prev,
          drag: { delta, velocity }
        }))
        
        onDrag?.(delta)
      },
      
      onDragEnd: () => {
        setIsGestureActive(false)
      },
      
      onWheel: ({ delta, velocity, event }) => {
        if (preventDefault) event.preventDefault()
        
        // Convert wheel to swipe
        if (Math.abs(delta[0]) > Math.abs(delta[1])) {
          const direction = delta[0] > 0 ? 'right' : 'left'
          onSwipe?.(direction)
        } else {
          const direction = delta[1] > 0 ? 'down' : 'up'
          onSwipe?.(direction)
        }
      },
      
      onPinch: ({ scale, velocity, event }) => {
        if (preventDefault) event.preventDefault()
        
        setIsGestureActive(true)
        setGestureData(prev => ({
          ...prev,
          pinch: { scale, velocity }
        }))
        
        onPinch?.(scale)
      },
      
      onPinchEnd: () => {
        setIsGestureActive(false)
      },
      
      onTap: ({ event }) => {
        if (preventDefault) event.preventDefault()
        onTap?.(event)
      },
      
      onLongPress: ({ event }) => {
        if (preventDefault) event.preventDefault()
        onLongPress?.(event)
      }
    },
    {
      drag: {
        threshold: threshold,
        filterTaps: true,
        bounds: undefined
      },
      pinch: {
        scaleBounds: { min: 0.5, max: 2 },
        rubberband: true
      },
      wheel: {
        axis: undefined,
        preventDefault: preventDefault
      }
    }
  )

  return {
    bind,
    isGestureActive,
    gestureData
  }
}

// Swipe detection hook
export const useSwipeDetection = (threshold: number = 50) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const [swipeVelocity, setSwipeVelocity] = useState(0)
  const capabilities = useDeviceCapabilities()

  const handleSwipe = useCallback((direction: 'up' | 'down' | 'left' | 'right', velocity: number) => {
    setSwipeDirection(direction)
    setSwipeVelocity(velocity)
    
    // Reset after animation
    setTimeout(() => {
      setSwipeDirection(null)
      setSwipeVelocity(0)
    }, 300)
  }, [])

  const bind = useTouchGestures({
    onSwipe: handleSwipe,
    threshold
  })

  return {
    ...bind,
    swipeDirection,
    swipeVelocity,
    isDisabled: !capabilities.isMobile || capabilities.isLowEndDevice
  }
}

// Pinch zoom hook
export const usePinchZoom = (minScale: number = 0.5, maxScale: number = 2) => {
  const [scale, setScale] = useState(1)
  const [isZooming, setIsZooming] = useState(false)
  const capabilities = useDeviceCapabilities()

  const handlePinch = useCallback((newScale: number) => {
    const clampedScale = Math.max(minScale, Math.min(maxScale, newScale))
    setScale(clampedScale)
    setIsZooming(true)
  }, [minScale, maxScale])

  const handlePinchEnd = useCallback(() => {
    setIsZooming(false)
  }, [])

  const bind = useTouchGestures({
    onPinch: handlePinch,
    onPinchEnd: handlePinchEnd
  })

  return {
    ...bind,
    scale,
    isZooming,
    isDisabled: !capabilities.isMobile || capabilities.isLowEndDevice
  }
}

// Drag hook
export const useDrag = () => {
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const capabilities = useDeviceCapabilities()

  const handleDrag = useCallback((delta: { x: number; y: number }) => {
    setDragDelta(delta)
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setDragDelta({ x: 0, y: 0 })
  }, [])

  const bind = useTouchGestures({
    onDrag: handleDrag,
    onDragEnd: handleDragEnd
  })

  return {
    ...bind,
    dragDelta,
    isDragging,
    isDisabled: !capabilities.isMobile || capabilities.isLowEndDevice
  }
}

// Touch feedback hook
export const useTouchFeedback = () => {
  const [isPressed, setIsPressed] = useState(false)
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })
  const capabilities = useDeviceCapabilities()

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!capabilities.isMobile) return
    
    setIsPressed(true)
    const touch = event.touches[0]
    setTouchPosition({ x: touch.clientX, y: touch.clientY })
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }, [capabilities.isMobile])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
  }, [])

  useEffect(() => {
    if (!capabilities.isMobile) return

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd, capabilities.isMobile])

  return {
    isPressed,
    touchPosition,
    isDisabled: !capabilities.isMobile || capabilities.isLowEndDevice
  }
}

// Export all hooks
export {
  type TouchGestureOptions,
  type TouchGestureReturn
}
