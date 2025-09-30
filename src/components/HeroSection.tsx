'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Wallet } from "lucide-react"
import Navbar from "./navigation/Navbar"
import { useTracker } from "@/hooks/use-analytics"

// Import new animation components
import FloatingShapes from './animations/FloatingShapes'
import ParallaxContainer, { ParallaxLayer, MultiLayerParallax } from './animations/ParallaxContainer'
import StaggerText, { AnimatedHeading } from './animations/StaggerText'
import TouchInteractions, { InteractiveButton, SwipeableCard } from './animations/TouchInteractions'
import { useDeviceCapabilities, useAdaptiveAnimation } from '@/lib/performance-utils'

interface FeatureProps {
  icon: React.ReactNode
  title: string
}

const Feature: React.FC<FeatureProps> = ({ icon, title }) => (
  <div className="flex flex-col items-center space-y-3 md:flex-row md:items-start md:space-y-0 md:space-x-3">
    <span className="text-4xl">{icon}</span>
    <p className="text-lg font-medium text-center md:text-left">{title}</p>
  </div>
)

interface LineProps {
  start: { x: number; y: number }
  end: { x: number; y: number }
  duration: number
  delay: number
}

const Line: React.FC<LineProps> = ({ start, end, duration, delay }) => {
  const controls = useAnimation()
  
  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration, delay, ease: "easeInOut" }
    })
  }, [controls, duration, delay])

  // Calculate line attributes (for future use)
  // const lineLength = Math.sqrt(
  //   Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  // )
  
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="rgba(30, 64, 175, 0.4)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={controls}
    />
  )
}

const Particle: React.FC<{ start: { x: number; y: number }; end: { x: number; y: number }; delay: number }> = ({ 
  start, 
  end,
  delay 
}) => {
  return (
    <motion.circle
      cx={start.x}
      cy={start.y}
      r="2"
      fill="#1e40af"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        cx: [start.x, end.x],
        cy: [start.y, end.y],
      }}
      transition={{
        duration: 2,
        delay,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: (delay % 3) + 2
      }}
    />
  )
}

export default function HeroSection() {
  const { buttonClick } = useTracker()
  const svgRef = useRef<SVGSVGElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; duration: number; delay: number }>>([])
  const [particles, setParticles] = useState<Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; delay: number }>>([])
  const [squares, setSquares] = useState<Array<HTMLElement | null>>([])
  const [isVisible, setIsVisible] = useState(false)

  // Animation capabilities
  const capabilities = useDeviceCapabilities()
  const { animationQuality, shouldReduceAnimations } = useAdaptiveAnimation()

  // Function to get center point of a square
  const getSquareCenter = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const gridRect = gridRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    
    return {
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height / 2
    }
  }

  // Function to create random connections between squares
  const createRandomConnections = useCallback(() => {
    if (!squares.length) return
    
    const newLines: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; duration: number; delay: number }> = []
    const newParticles: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; delay: number }> = []
    
    // Each square can have 1-3 connections
    squares.forEach((square, idx) => {
      if (!square) return
      
      const numConnections = (idx % 3) + 1
      const start = getSquareCenter(square)
      
      for (let i = 0; i < numConnections; i++) {
        // Find a different square to connect to
        const targetIdx = (idx + i + 1) % squares.length
        
        const targetSquare = squares[targetIdx]
        if (!targetSquare) continue
        
        const end = getSquareCenter(targetSquare)
        const duration = ((idx + i) % 10) * 0.1 + 0.5 // 0.5-1.5s
        const delay = ((idx + i) % 5) * 0.1
        
        newLines.push({
          start,
          end,
          id: `line-${idx}-${targetIdx}-${i}`,
          duration,
          delay
        })
        
        // Add particle that travels along the line
        if (idx % 2 === 0) {
          newParticles.push({
            start,
            end,
            id: `particle-${idx}-${targetIdx}-${i}`,
            delay: ((idx + targetIdx) % 4) * 0.5
          })
        }
      }
    })
    
    setLines(newLines)
    setParticles(newParticles)
  }, [squares])

  // Initialize connections
  useEffect(() => {
    if (gridRef.current) {
      const squareElements = Array.from(gridRef.current.querySelectorAll('[id^="square-"]')) as HTMLElement[]
      setSquares(squareElements)
      
      // Delay animation start to ensure elements are rendered
      setTimeout(() => {
        setIsVisible(true)
        createRandomConnections()
      }, 500)
    }
    
    // Recreate connections periodically
    const intervalId = setInterval(() => {
      createRandomConnections()
    }, 8000)
    
    return () => clearInterval(intervalId)
  }, [createRandomConnections])

  // Square animation variants
  const squareVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(30, 64, 175, 0.6)",
      backgroundColor: "rgba(30, 64, 175, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  }

  // Enhanced parallax layers for the grid section
  const parallaxLayers = [
    {
      children: (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <motion.div 
              key={index}
              className="h-24 w-24 rounded-lg bg-blue-900/20 p-4 relative"
              id={`square-${index}`}
              custom={index}
              variants={squareVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-blue-800 opacity-20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </div>
      ),
      speed: 0.1,
      direction: 'up' as const,
      className: 'relative z-10'
    },
    {
      children: (
        <svg 
          ref={svgRef} 
          className="absolute w-full h-full z-0 pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          <AnimatePresence>
            {isVisible && lines.map(line => (
              <Line 
                key={line.id}
                start={line.start}
                end={line.end}
                duration={line.duration}
                delay={line.delay}
              />
            ))}
            
            {isVisible && particles.map(particle => (
              <Particle 
                key={particle.id}
                start={particle.start}
                end={particle.end}
                delay={particle.delay}
              />
            ))}
          </AnimatePresence>
        </svg>
      ),
      speed: 0.05,
      direction: 'up' as const,
      className: 'absolute inset-0'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden relative">
      {/* Floating Shapes Background */}
      <FloatingShapes 
        count={capabilities.isLowEndDevice ? 8 : 15}
        intensity={animationQuality === 'low' ? 'low' : 'medium'}
        className="absolute inset-0 z-0"
      />

      <Navbar />

      <main className="container mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 relative z-10">
        {/* Left Column - Enhanced with StaggerText */}
        <div className="flex flex-col justify-center space-y-6">
          <AnimatedHeading
            title="Secure p2p transactions platform"
            className="text-5xl font-bold leading-tight"
            titleAnimation="slideUp"
            subtitleAnimation="fadeIn"
            staggerDelay={0.1}
          />
          
          <StaggerText
            text="Experience the power of decentralized trust and seamless blockchain transactions. Our blue-chip security standards ensure your deposits are always protected in our revolutionary P2P platform."
            className="text-xl text-gray-400"
            animationType="fadeIn"
            staggerDelay={0.05}
            delay={0.6}
          />
          
          <motion.div 
            className="flex max-w-md items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <TouchInteractions enableSwipe={false} enablePinch={false}>
              <InteractiveButton
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg flex items-center gap-2"
                onClick={() => buttonClick('connect_wallet_button', { location: 'hero_section' })}
                hapticFeedback={capabilities.isMobile}
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </InteractiveButton>
            </TouchInteractions>
          </motion.div>

          {/* Features with enhanced animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <SwipeableCard
              onSwipeLeft={() => console.log('Feature 1 swiped left')}
              onSwipeRight={() => console.log('Feature 1 swiped right')}
            >
              <Feature 
                icon="🔒" 
                title="Bank-grade security" 
              />
            </SwipeableCard>
            
            <SwipeableCard
              onSwipeLeft={() => console.log('Feature 2 swiped left')}
              onSwipeRight={() => console.log('Feature 2 swiped right')}
            >
              <Feature 
                icon="⚡" 
                title="Lightning fast" 
              />
            </SwipeableCard>
            
            <SwipeableCard
              onSwipeLeft={() => console.log('Feature 3 swiped left')}
              onSwipeRight={() => console.log('Feature 3 swiped right')}
            >
              <Feature 
                icon="🌍" 
                title="Global reach" 
              />
            </SwipeableCard>
            
            <SwipeableCard
              onSwipeLeft={() => console.log('Feature 4 swiped left')}
              onSwipeRight={() => console.log('Feature 4 swiped right')}
            >
              <Feature 
                icon="💎" 
                title="Premium quality" 
              />
            </SwipeableCard>
          </motion.div>
        </div>

        {/* Right Column - Enhanced with ParallaxContainer */}
        <ParallaxContainer
          speed={0.2}
          direction="up"
          className="hidden lg:flex items-center justify-center relative"
          threshold={0.1}
        >
          <div ref={gridRef} className="relative w-full h-full">
            <MultiLayerParallax
              layers={parallaxLayers}
              className="relative w-full h-full"
            />
            
            {/* Enhanced floating particles */}
            {!shouldReduceAnimations && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(capabilities.isLowEndDevice ? 8 : 15)].map((_, index) => {
                  const leftPos = (index * 7.14) % 100
                  const topPos = (index * 6.67) % 100
                  const xMove = (index % 3 - 1) * 20
                  const yMove = ((index + 1) % 3 - 1) * 20
                  const duration = 2 + (index % 3)
                  const delay = (index % 4) * 0.5
                  
                  return (
                    <motion.div
                      key={`particle-float-${index}`}
                      className="absolute w-1 h-1 bg-blue-500 rounded-full"
                      style={{
                        left: `${leftPos}%`,
                        top: `${topPos}%`,
                      }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                        x: [0, xMove],
                        y: [0, yMove],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </ParallaxContainer>
      </main>

      {/* Enhanced background glow effects with parallax */}
      <ParallaxLayer speed={0.1} direction="up" className="absolute inset-0 pointer-events-none">
        <div className="absolute right-1/6 bottom-1/6 w-32 h-32 bg-blue-800 rounded-full filter blur-3xl opacity-8" />
        <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-blue-900 rounded-full filter blur-2xl opacity-5" />
        <div className="absolute top-1/6 left-1/6 w-20 h-20 bg-blue-950 rounded-full filter blur-xl opacity-10" />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.05} direction="up" className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/12 right-1/3 w-16 h-16 bg-indigo-900 rounded-full filter blur-xl opacity-6" />
        <div className="absolute top-1/5 right-1/5 w-14 h-14 bg-blue-800 rounded-full filter blur-lg opacity-7" />
        <div className="absolute top-2/3 left-1/12 w-18 h-18 bg-blue-700 rounded-full filter blur-2xl opacity-4" />
        <div className="absolute bottom-1/3 right-1/12 w-12 h-12 bg-indigo-800 rounded-full filter blur-lg opacity-6" />
      </ParallaxLayer>
    </div>
  )
}