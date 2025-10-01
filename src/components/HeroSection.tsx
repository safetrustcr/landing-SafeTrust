"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, X } from "lucide-react";
import Navbar from "./navigation/Navbar";
import { useTracker } from "@/hooks/use-analytics";

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
      transition: { duration, delay, ease: "easeInOut" },
    });
  }, [controls, duration, delay]);

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
  );
};

const Particle: React.FC<{
  start: { x: number; y: number };
  end: { x: number; y: number };
  delay: number;
}> = ({ start, end, delay }) => {
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
        repeatDelay: (delay % 3) + 2,
      }}
    />
  );
};

export default function HeroSection() {
  const { buttonClick } = useTracker();
  const svgRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
      id: string;
      duration: number;
      delay: number;
    }>
  >([]);
  const [particles, setParticles] = useState<
    Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
      id: string;
      delay: number;
    }>
  >([]);
  const [squares, setSquares] = useState<HTMLElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // ESC key closes mobile menu
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getSquareCenter = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const gridRect = gridRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    return {
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height / 2,
    };
  };

  const createRandomConnections = () => {
    if (!squares.length) return;

    const newLines: Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
      id: string;
      duration: number;
      delay: number;
    }> = [];
    const newParticles: Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
      id: string;
      delay: number;
    }> = [];

    squares.forEach((square, idx) => {
      if (!square) return;
      const numConnections = (idx % 3) + 1;
      const start = getSquareCenter(square);

      for (let i = 0; i < numConnections; i++) {
        const targetIdx = (idx + i + 1) % squares.length;
        const targetSquare = squares[targetIdx];
        if (!targetSquare) continue;

        const end = getSquareCenter(targetSquare);
        const duration = ((idx + i) % 10) * 0.1 + 0.5;
        const delay = ((idx + i) % 5) * 0.1;

        newLines.push({
          start,
          end,
          id: `line-${idx}-${targetIdx}-${i}`,
          duration,
          delay,
        });

        if (idx % 2 === 0) {
          newParticles.push({
            start,
            end,
            id: `particle-${idx}-${targetIdx}-${i}`,
            delay: ((idx + targetIdx) % 4) * 0.5,
          });
        }
      }
    });

    setLines(newLines);
    setParticles(newParticles);
  };

  useEffect(() => {
    if (gridRef.current) {
      const squareElements = Array.from(
        gridRef.current.querySelectorAll('[id^="square-"]')
      ) as HTMLElement[];
      setSquares(squareElements);

      setTimeout(() => {
        setIsVisible(true);
        createRandomConnections();
      }, 500);
    }

    const intervalId = setInterval(() => {
      createRandomConnections();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [squares.length]);

  const squareVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(30, 64, 175, 0.6)",
      backgroundColor: "rgba(30, 64, 175, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden">
      {/* Navbar with Hamburger */}
      <div className="relative z-50">
        <Navbar />
        {/* Hamburger Button for mobile */}
        <button
          className="lg:hidden absolute top-4 left-4 p-2"
          onClick={openMobileMenu}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          >
            <Button
              variant="close"
              size="icon"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>

            <nav className="flex flex-col items-center space-y-6 text-lg">
              <a href="#home" onClick={closeMobileMenu}>
                Home
              </a>
              <a href="#about" onClick={closeMobileMenu}>
                About
              </a>
              <a href="#contact" onClick={closeMobileMenu}>
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section content (your existing code) */}
      <main className="container mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
        <div className="flex flex-col justify-center space-y-6">
          <motion.h1
            className="text-5xl font-bold leading-tight"
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
            </motion.span>{" "}
            p2p
            <span className="block">transactions platform</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg flex items-center gap-2"
                onClick={() =>
                  buttonClick("connect_wallet_button", {
                    location: "hero_section",
                  })
                }
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
            style={{ overflow: "visible" }}
          >
            <AnimatePresence>
              {isVisible &&
                lines.map((line) => (
                  <Line
                    key={line.id}
                    start={line.start}
                    end={line.end}
                    duration={line.duration}
                    delay={line.delay}
                  />
                ))}
              {isVisible &&
                particles.map((particle) => (
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
                className="h-24 w-24 rounded-lg bg-blue-900/20 p-4 relative"
                id={`square-${index}`}
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
                variants={squareVariants}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent to-blue-800 opacity-20"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
