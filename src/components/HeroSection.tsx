
"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Shield, Lock, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navigation/Navbar";
import WalletModal from "./wallet/WalletModal";
import { useWallet } from "../hooks/use-wallet";

export interface HeroSectionProps {
  className?: string;
}

export interface TrustIndicator {
  icon: string;
  label: string;
  color: "green" | "blue" | "yellow";
}

export interface CTAButton {
  text: string;
  variant: "primary" | "secondary";
  icon?: string;
  onClick?: () => void;
}

interface LineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  duration: number;
  delay: number;
}

interface ParticleProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  delay: number;
}

const Line: React.FC<LineProps> = ({ start, end, duration, delay }) => (
  <motion.line
    x1={start.x}
    y1={start.y}
    x2={end.x}
    y2={end.y}
    stroke="rgba(59, 130, 246, 0.3)"
    strokeWidth="1"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration, delay }}
  />
);

const Particle: React.FC<ParticleProps> = ({ start, end, delay }) => (
  <motion.circle
    cx={start.x}
    cy={start.y}
    r="2"
    fill="rgb(59, 130, 246)"
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{ 
      x: end.x - start.x, 
      y: end.y - start.y, 
      opacity: [0, 1, 0] 
    }}
    transition={{ duration: 2, delay, repeat: Infinity }}
  />
);

const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, className, onClick, disabled = false }) => (
  <button 
    className={className} 
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const HeroSection: React.FC<HeroSectionProps> = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [lines, setLines] = useState<Array<{
    id: number;
    start: { x: number; y: number };
    end: { x: number; y: number };
    duration: number;
    delay: number;
  }>>([]);
  const [particles, setParticles] = useState<Array<{
    id: number;
    start: { x: number; y: number };
    end: { x: number; y: number };
    delay: number;
  }>>([]);

  // Use wallet hook for connection state
  const { isConnected, isConnecting, account, error } = useWallet();

  // Debug wallet state changes
  useEffect(() => {
    console.log('[HeroSection] Wallet state changed:', {
      isConnected,
      isConnecting,
      account,
      error
    });
  }, [isConnected, isConnecting, account, error]);

  const buttonClick = (action: string, metadata: object) => {
    console.log(`[HeroSection] Button clicked: ${action}`, metadata);
  };

  // Open wallet modal
  const openWalletModal = () => {
    console.log('[HeroSection] Opening wallet modal');
    setIsWalletModalOpen(true);
    buttonClick("connect_wallet_button", {
      location: "hero_section",
      currentState: { isConnected, isConnecting }
    });
  };

  // Close wallet modal
  const closeWalletModal = () => {
    console.log('[HeroSection] Closing wallet modal');
    setIsWalletModalOpen(false);
  };

  useEffect(() => {
    setIsVisible(true);

    // Generate sample lines and particles
    const sampleLines = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      start: { x: Math.random() * 300, y: Math.random() * 300 },
      end: { x: Math.random() * 300, y: Math.random() * 300 },
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2
    }));

    const sampleParticles = Array.from({ length: 3 }, (_, i) => ({
      id: i + 100,
      start: { x: Math.random() * 300, y: Math.random() * 300 },
      end: { x: Math.random() * 300, y: Math.random() * 300 },
      delay: Math.random() * 3
    }));

    setLines(sampleLines);
    setParticles(sampleParticles);
  }, []);

  // Main button configuration based on wallet state
  const getMainButtonConfig = () => {
    if (isConnecting) {
      return {
        text: 'Connecting...',
        className: `
          px-6 py-3 text-lg flex items-center gap-2 rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          bg-blue-400 text-white cursor-not-allowed opacity-75
        `,
        disabled: true
      };
    }

    if (isConnected && account) {
      return {
        text: `Connected (${account.slice(0, 6)}...${account.slice(-4)})`,
        className: `
          px-6 py-3 text-lg flex items-center gap-2 rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200
          bg-green-600 hover:bg-green-700 text-white cursor-pointer
        `,
        disabled: false
      };
    }

    return {
      text: 'Connect Wallet',
      className: `
        px-6 py-3 text-lg flex items-center gap-2 rounded-lg font-medium
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
        bg-blue-600 hover:bg-blue-700 text-white cursor-pointer
      `,
      disabled: false
    };
  };

  // Secondary button configuration based on wallet state
  const getSecondaryButtonConfig = () => {
    if (isConnecting) {
      return {
        text: 'Connecting...',
        className: `
          group font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 text-lg
          bg-purple-400 cursor-not-allowed opacity-75 text-white
        `,
        disabled: true
      };
    }

    if (isConnected) {
      return {
        text: 'Wallet Connected',
        className: `
          group font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 text-lg
          bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/25 text-white cursor-pointer
        `,
        disabled: false
      };
    }

    return {
      text: 'Connect Wallet',
      className: `
        group font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-3 text-lg
        bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white cursor-pointer
      `,
      disabled: false
    };
  };

  const mainButtonConfig = getMainButtonConfig();
  const secondaryButtonConfig = getSecondaryButtonConfig();

  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden relative">
      <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <Navbar />

      <main
        id="main-content"
        className="container mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-12 px-4"
      >
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
            <motion.div 
              whileHover={!mainButtonConfig.disabled ? { scale: 1.05 } : {}} 
              whileTap={!mainButtonConfig.disabled ? { scale: 0.95 } : {}}
            >
              <Button
                className={mainButtonConfig.className}
                onClick={mainButtonConfig.disabled ? undefined : openWalletModal}
                disabled={mainButtonConfig.disabled}
              >
                <Wallet className="w-5 h-5" />
                {mainButtonConfig.text}
              </Button>
            </motion.div>
          </motion.div>

          {/* Error display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-900/20 border border-red-600/30 rounded-lg"
            >
              <p className="text-red-400 text-sm">
                {error}
              </p>
            </motion.div>
          )}
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
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                whileHover={{ scale: 1.05 }}
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
                    delay: index * 0.2,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <section className="w-full max-w-6xl mx-auto text-center space-y-8 px-4 sm:px-0 py-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
          Secure p2p transactions platform
        </h2>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 w-full max-w-5xl mx-auto leading-relaxed font-medium">
          Experience the power of decentralized trust and seamless
          blockchain transactions. Our blue-chip security standards ensure
          your deposits are always protected in our revolutionary P2P
          platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button 
            onClick={secondaryButtonConfig.disabled ? undefined : openWalletModal}
            disabled={secondaryButtonConfig.disabled}
            className={secondaryButtonConfig.className}
          >
            <Lock className="w-5 h-5" />
            {secondaryButtonConfig.text}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button className="group border-2 border-gray-600 hover:border-purple-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-purple-500/10 flex items-center gap-3 text-lg">
            Learn More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-12 opacity-70 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Bank-Grade Security</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Lock className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">
              End-to-End Encrypted
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">₮</span>
            </div>
            <span className="text-sm font-medium">USDT Protected</span>
          </div>
        </div>
      </section>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={closeWalletModal} 
      />

      <style jsx>{`
        .skip-to-content {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          z-index: 1000;
        }
        .skip-to-content:focus {
          top: 6px;
        }

        @media (min-width: 1920px) {
          .content-wrapper {
            padding-left: 10%;
            padding-right: 10%;
          }
        }

        @media (min-width: 1366px) and (max-width: 1919px) {
          .content-wrapper {
            padding-left: 8%;
            padding-right: 8%;
          }
        }

        @media (min-width: 768px) and (max-width: 1365px) {
          .content-wrapper {
            padding-left: 5%;
            padding-right: 5%;
          }
        }

        @media (max-width: 767px) {
          .content-wrapper {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .hero-content {
            padding-top: 15vh;
            padding-bottom: 5vh;
            min-height: 100vh;
          }

          .hero-main-content {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
