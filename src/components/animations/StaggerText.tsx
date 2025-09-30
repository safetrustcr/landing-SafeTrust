'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'
import { animationPresets, createStaggerVariants } from '@/lib/animation-utils'

interface StaggerTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'typing'
  duration?: number
  threshold?: number
  once?: boolean
}

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

// Main Stagger Text Component
const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  animationType = 'fadeIn',
  duration = 0.6,
  threshold = 0.1,
  once = true
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once
  })
  
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()
  
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [inView, delay])

  // Split text into words or characters based on animation type
  const textElements = animationType === 'typing' ? text.split('') : text.split(' ')

  // Get animation variants based on type
  const getAnimationVariants = () => {
    if (shouldReduceAnimations) {
      return {
        container: {
          animate: {
            transition: {
              staggerChildren: staggerDelay * 2
            }
          }
        },
        item: {
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        }
      }
    }

    const baseVariants = createStaggerVariants(staggerDelay, 0)

    switch (animationType) {
      case 'fadeIn':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.fadeIn
          }
        }
      
      case 'slideUp':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.fadeInUp
          }
        }
      
      case 'slideDown':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.fadeInDown
          }
        }
      
      case 'slideLeft':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.fadeInLeft
          }
        }
      
      case 'slideRight':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.fadeInRight
          }
        }
      
      case 'scaleIn':
        return {
          container: baseVariants.container,
          item: {
            ...baseVariants.item,
            ...animationPresets.scaleIn
          }
        }
      
      default:
        return baseVariants
    }
  }

  const variants = getAnimationVariants()

  // Don't animate on low-end devices if performance is critical
  if (capabilities.isLowEndDevice && shouldReduceAnimations) {
    return (
      <div ref={ref} className={className}>
        {text}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants.container}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      transition={{ duration, ease: "easeOut" }}
    >
      {textElements.map((element, index) => (
        <motion.span
          key={index}
          variants={variants.item}
          className="inline-block"
          style={{ marginRight: animationType === 'typing' ? '0' : '0.25em' }}
        >
          {element}
          {animationType === 'typing' && index < textElements.length - 1 ? '' : ' '}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Typing Animation Component
const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const capabilities = useDeviceCapabilities()
  const { shouldReduceAnimations } = useAdaptiveAnimation()

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayedText(text)
      onComplete?.()
      return
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      onComplete?.()
    }
  }, [currentIndex, text, speed, onComplete, shouldReduceAnimations])

  return (
    <span className={className}>
      {displayedText}
      {!shouldReduceAnimations && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-current ml-1"
        />
      )}
    </span>
  )
}

// Animated Heading Component
interface AnimatedHeadingProps {
  title: string
  subtitle?: string
  className?: string
  titleAnimation?: StaggerTextProps['animationType']
  subtitleAnimation?: StaggerTextProps['animationType']
  staggerDelay?: number
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  title,
  subtitle,
  className = '',
  titleAnimation = 'slideUp',
  subtitleAnimation = 'fadeIn',
  staggerDelay = 0.1
}) => {
  return (
    <div className={className}>
      <StaggerText
        text={title}
        animationType={titleAnimation}
        staggerDelay={staggerDelay}
        className="text-4xl md:text-6xl font-bold"
      />
      {subtitle && (
        <StaggerText
          text={subtitle}
          animationType={subtitleAnimation}
          staggerDelay={staggerDelay}
          delay={0.5}
          className="text-lg md:text-xl mt-4 opacity-80"
        />
      )}
    </div>
  )
}

// Animated Paragraph Component
interface AnimatedParagraphProps {
  text: string
  className?: string
  animationType?: StaggerTextProps['animationType']
  staggerDelay?: number
  delay?: number
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  className = '',
  animationType = 'fadeIn',
  staggerDelay = 0.05,
  delay = 0
}) => {
  return (
    <StaggerText
      text={text}
      animationType={animationType}
      staggerDelay={staggerDelay}
      delay={delay}
      className={className}
    />
  )
}

// Export all components
export {
  TypingText,
  AnimatedHeading,
  AnimatedParagraph
}

export default StaggerText
