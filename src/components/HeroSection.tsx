"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title }) => (
  <div className="flex flex-col items-center space-y-3 md:flex-row md:items-start md:space-y-0 md:space-x-3">
    <span className="text-4xl">{icon}</span>
    <p className="text-lg font-medium text-center md:text-left">{title}</p>
  </div>
);

interface LineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  duration: number;
  delay: number;
}

const Line: React.FC<LineProps> = ({ start, end, duration, delay }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration, delay, ease: "easeInOut" }
    });
  }, [controls, duration, delay]);

  // Calculate line attributes
  const lineLength = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
  
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="rgba(59, 130, 246, 0.5)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={controls}
    />
  );
};

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
      fill="#3b82f6"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        cx: [start.x, end.x],
        cy: [start.y, end.y],
      }}
      transition={{
        duration: 2,
        delay,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2
      }}
    />
  );
};

const HeroSection: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; duration: number; delay: number }>>([]);
  const [particles, setParticles] = useState<Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; delay: number }>>([]);
  const [squares, setSquares] = useState<Array<HTMLElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Function to get center point of a square
  const getSquareCenter = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const gridRect = gridRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    
    return {
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height / 2
    };
  };

  // Function to create random connections between squares
  const createRandomConnections = () => {
    if (!squares.length) return;
    
    const newLines: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; duration: number; delay: number }> = [];
    const newParticles: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; id: string; delay: number }> = [];
    
    // Each square can have 1-3 connections
    squares.forEach((square, idx) => {
      if (!square) return;
      
      const numConnections = Math.floor(Math.random() * 3) + 1;
      const start = getSquareCenter(square);
      
      for (let i = 0; i < numConnections; i++) {
        // Find a different square to connect to
        let targetIdx;
        do {
          targetIdx = Math.floor(Math.random() * squares.length);
        } while (targetIdx === idx || !squares[targetIdx]);
        
        const targetSquare = squares[targetIdx];
        if (!targetSquare) continue;
        
        const end = getSquareCenter(targetSquare);
        const duration = Math.random() * 1 + 0.5; // 0.5-1.5s
        const delay = Math.random() * 0.5;
        
        newLines.push({
          start,
          end,
          id: `line-${idx}-${targetIdx}-${i}`,
          duration,
          delay
        });
        
        // Add particle that travels along the line
        if (Math.random() > 0.5) {
          newParticles.push({
            start,
            end,
            id: `particle-${idx}-${targetIdx}-${i}`,
            delay: Math.random() * 2
          });
        }
      }
    });
    
    setLines(newLines);
    setParticles(newParticles);
  };

  // Initialize connections
  useEffect(() => {
    if (gridRef.current) {
      const squareElements = Array.from(gridRef.current.querySelectorAll('[id^="square-"]')) as HTMLElement[];
      setSquares(squareElements);
      
      // Delay animation start to ensure elements are rendered
      setTimeout(() => {
        setIsVisible(true);
        createRandomConnections();
      }, 500);
    }
    
    // Recreate connections periodically
    const intervalId = setInterval(() => {
      createRandomConnections();
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);

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
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
      backgroundColor: "rgba(30, 64, 175, 0.4)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-24 relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', color: 'white' }}
    >
      <div className="max-w-xl z-10 text-center md:text-left md:mr-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="text-blue-500"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Secure
          </motion.span> p2p transactions platform
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Experience the power of decentralized trust and seamless blockchain transactions. 
          Our blue-chip security standards ensure your deposits are always protected in our 
          revolutionary P2P platform.
        </motion.p>
        
        <motion.button 
          className="bg-blue-600 text-white py-3 px-6 rounded flex items-center gap-2 hover:bg-blue-700 transition-colors mx-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>
          Get Started
        </motion.button>
      </div>
      
      <motion.div 
        className="relative w-72 h-72 mt-16 md:mt-0"
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg 
          ref={svgRef} 
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
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
        
        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
          {[...Array(9)].map((_, index) => (
            <motion.div 
              key={index}
              className="bg-blue-900 bg-opacity-20 rounded relative overflow-hidden"
              id={`square-${index}`}
              custom={index}
              variants={squareVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover="hover"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-600 opacity-10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
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
        
        {/* Floating particles in the background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={`particle-float-${index}`}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl opacity-5 pointer-events-none" />
    </section>
  );
};

export default HeroSection;