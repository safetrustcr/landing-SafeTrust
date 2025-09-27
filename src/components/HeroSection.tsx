"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Navbar from "./navigation/Navbar";

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

  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="rgba(59, 130, 246, 0.4)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={controls}
      className="dark:stroke-blue-400/40 stroke-blue-600/40"
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
        opacity: [0, 0.8, 0],
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
      className="dark:fill-blue-400 fill-blue-600"
    />
  );
};

export default function HeroSection() {
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
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      <Navbar />

      <main className="container mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
        <div className="flex flex-col justify-center space-y-6">
          <motion.h1 
            className="text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="text-blue-500 dark:text-blue-400"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Secure
            </motion.span> p2p
            <span className="block">transactions platform</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Experience the power of decentralized trust and seamless blockchain
            transactions. Our blue-chip security standards ensure your deposits
            are always protected in our revolutionary P2P platform.
          </motion.p>
          
          <motion.div 
            className="flex max-w-md items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 text-lg flex items-center gap-2 transition-colors duration-300"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="hidden lg:flex items-center justify-center relative"
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
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
          
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <motion.div 
                key={index}
                className="h-24 w-24 rounded-lg bg-blue-900/20 dark:bg-blue-800/30 light:bg-blue-100/50 p-4 relative border border-blue-200/20 dark:border-blue-700/30 transition-colors duration-300"
                id={`square-${index}`}
                custom={index}
                variants={squareVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-blue-800/50 dark:to-blue-600/30 opacity-20"
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
          
          {/* Floating particles in the background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, index) => (
              <motion.div
                key={`particle-float-${index}`}
                className="absolute w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
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
      
        {/* Background glow effects - positioned away from squares */}
        <div className="absolute right-1/6 bottom-1/6 w-32 h-32 bg-blue-800/20 dark:bg-blue-600/10 rounded-full filter blur-3xl opacity-80 dark:opacity-60 pointer-events-none transition-opacity duration-300" />
        <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-blue-900/15 dark:bg-blue-700/10 rounded-full filter blur-2xl opacity-50 dark:opacity-40 pointer-events-none transition-opacity duration-300" />
        <div className="absolute top-1/6 left-1/6 w-20 h-20 bg-blue-950/20 dark:bg-blue-800/15 rounded-full filter blur-xl opacity-60 dark:opacity-50 pointer-events-none transition-opacity duration-300" />
        
        {/* Additional round lights */}
        <div className="absolute bottom-1/12 right-1/3 w-16 h-16 bg-indigo-900/15 dark:bg-indigo-600/10 rounded-full filter blur-xl opacity-60 dark:opacity-40 pointer-events-none transition-opacity duration-300" />
        <div className="absolute top-1/5 right-1/5 w-14 h-14 bg-blue-800/20 dark:bg-blue-500/15 rounded-full filter blur-lg opacity-70 dark:opacity-50 pointer-events-none transition-opacity duration-300" />
        <div className="absolute top-2/3 left-1/12 w-18 h-18 bg-blue-700/15 dark:bg-blue-400/10 rounded-full filter blur-2xl opacity-40 dark:opacity-30 pointer-events-none transition-opacity duration-300" />
        <div className="absolute bottom-1/3 right-1/12 w-12 h-12 bg-indigo-800/20 dark:bg-indigo-500/15 rounded-full filter blur-lg opacity-60 dark:opacity-45 pointer-events-none transition-opacity duration-300" />
      </main>
    </div>
  );
}