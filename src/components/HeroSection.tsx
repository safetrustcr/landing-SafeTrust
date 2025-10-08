"use client";

import React from "react";
import { ArrowRight, Shield, Lock } from "lucide-react";
import Navbar from "./navigation/Navbar";

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

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden relative">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg flex items-center gap-2 focus-visible"
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

          {/* Main Content */}
          <div className="hero-main-content w-full max-w-6xl mx-auto text-center space-y-8 px-4 sm:px-0">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Secure p2p transactions platform
            </h2>

            {/* Subtext - Increased width */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 w-full max-w-5xl mx-auto leading-relaxed font-medium">
              Experience the power of decentralized trust and seamless
              blockchain transactions. Our blue-chip security standards ensure
              your deposits are always protected in our revolutionary P2P
              platform.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-3 text-lg">
                <Lock className="w-5 h-5" />
                Connect Wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="group border-2 border-gray-600 hover:border-purple-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-purple-500/10 flex items-center gap-3 text-lg">
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Trust Indicators */}
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
          </div>
        </div>
      </div>

      {/* Responsive Margin Styles */}
      <style jsx>{`
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
    </section>
  );
};

export default HeroSection;
