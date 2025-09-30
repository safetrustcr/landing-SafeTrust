'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeDetection, usePinchZoom, useDrag, useTouchFeedback } from '@/hooks/use-touch-gestures'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'

interface TouchInteractionsProps {
  children: React.ReactNode
  className?: string
  enableSwipe?: boolean
  enablePinch?: boolean
  enableDrag?: boolean
  enableTap?: boolean
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void
  onPinch?: (scale: number) => void
  onDrag?: (delta: { x: number; y: number }) => void
  onTap?: (event: Event) => void
}

interface TouchFeedbackProps {
  position: { x: number; y: number }
  isVisible: boolean
  type: 'tap' | 'swipe' | 'pinch'
}

// Touch feedback component
const TouchFeedback: React.FC<TouchFeedbackProps> = ({ position, isVisible, type }) => {
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  if (shouldReduceAnimations) return null

  const getFeedbackStyle = () => {
    switch (type) {
      case 'tap':
        return 'w-4 h-4 bg-blue-500/30 rounded-full'
      case 'swipe':
        return 'w-8 h-8 bg-purple-500/30 rounded-full'
      case 'pinch':
        return 'w-12 h-12 bg-green-500/30 rounded-full'
      default:
        return 'w-4 h-4 bg-blue-500/30 rounded-full'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`absolute pointer-events-none z-50 ${getFeedbackStyle()}`}
          style={{
            left: position.x - 8,
            top: position.y - 8
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  )
}

// Main Touch Interactions Component
const TouchInteractions: React.FC<TouchInteractionsProps> = ({
  children,
  className = '',
  enableSwipe = true,
  enablePinch = true,
  enableDrag = true,
  enableTap = true,
  onSwipe,
  onPinch,
  onDrag,
  onTap
}) => {
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()
  const [feedback, setFeedback] = useState<{
    position: { x: number; y: number }
    isVisible: boolean
    type: 'tap' | 'swipe' | 'pinch'
  }>({
    position: { x: 0, y: 0 },
    isVisible: false,
    type: 'tap'
  })

  // Always call hooks at the top level
  const swipeData = useSwipeDetection(50)
  const pinchData = usePinchZoom(0.5, 2)
  const dragData = useDrag()
  const touchData = useTouchFeedback()

  // Don't enable touch interactions on desktop or low-end devices
  if (!capabilities.isMobile || capabilities.isLowEndDevice || shouldReduceAnimations) {
    return <div className={className}>{children}</div>
  }

  // Touch feedback handlers
  const showFeedback = (position: { x: number; y: number }, type: 'tap' | 'swipe' | 'pinch') => {
    setFeedback({ position, isVisible: true, type })
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, isVisible: false }))
    }, 300)
  }

  // Combined gesture bindings
  const combinedBind = {
    ...swipeData.bind,
    ...pinchData.bind,
    ...dragData.bind,
    onTap: (event: Event) => {
      if (enableTap) {
        const mouseEvent = event as MouseEvent
        showFeedback({ x: mouseEvent.clientX, y: mouseEvent.clientY }, 'tap')
        onTap?.(event)
      }
    },
    onSwipe: (direction: 'up' | 'down' | 'left' | 'right') => {
      if (enableSwipe) {
        showFeedback(touchData.touchPosition, 'swipe')
        onSwipe?.(direction)
      }
    },
    onPinch: (newScale: number) => {
      if (enablePinch) {
        showFeedback(touchData.touchPosition, 'pinch')
        onPinch?.(newScale)
      }
    },
    onDrag: (delta: { x: number; y: number }) => {
      if (enableDrag) {
        onDrag?.(delta)
      }
    }
  }

  return (
    <div className={`relative ${className}`} {...combinedBind}>
      {children}
      
      {/* Touch feedback overlay */}
      <TouchFeedback
        position={feedback.position}
        isVisible={feedback.isVisible}
        type={feedback.type}
      />
      
      {/* Visual feedback for active gestures */}
      {dragData.isDragging && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(circle at ${touchData.touchPosition.x}px ${touchData.touchPosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {pinchData.isZooming && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(circle at ${touchData.touchPosition.x}px ${touchData.touchPosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  )
}

// Interactive Button Component
interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  hapticFeedback?: boolean
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  className = '',
  hapticFeedback = true
}) => {
  const capabilities = useDeviceCapabilities()
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    if (capabilities.isMobile && hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
    onClick?.()
  }

  return (
    <motion.button
      className={className}
      onClick={handlePress}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  )
}

// Swipeable Card Component
interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = ''
}) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)

  const handleSwipe = (direction: 'up' | 'down' | 'left' | 'right') => {
    setSwipeDirection(direction)
    
    switch (direction) {
      case 'left':
        onSwipeLeft?.()
        break
      case 'right':
        onSwipeRight?.()
        break
      case 'up':
        onSwipeUp?.()
        break
      case 'down':
        onSwipeDown?.()
        break
    }
    
    setTimeout(() => setSwipeDirection(null), 300)
  }

  return (
    <TouchInteractions
      className={className}
      onSwipe={handleSwipe}
      enablePinch={false}
      enableDrag={false}
    >
      <motion.div
        animate={swipeDirection ? {
          x: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : 0,
          y: swipeDirection === 'up' ? -20 : swipeDirection === 'down' ? 20 : 0,
          opacity: 0.8
        } : {
          x: 0,
          y: 0,
          opacity: 1
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </TouchInteractions>
  )
}

// Export all components
export {
  InteractiveButton,
  SwipeableCard
}

export default TouchInteractions