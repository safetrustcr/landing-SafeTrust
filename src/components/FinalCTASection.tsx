"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Wallet, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WalletModal from "@/components/wallet/WalletModal";

export function FinalCTASection() {
  const prefersReducedMotion = useReducedMotion();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleReadDocs = () => {
    // Navigate to documentation
    window.open("https://docs.safetrust.com", "_blank", "noopener,noreferrer");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <section
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
        aria-labelledby="final-cta-heading"
      >
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 dark:from-gray-950 dark:via-blue-950 dark:to-black" />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            {/* Eyebrow Pill */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary-foreground border border-primary/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span className="font-semibold">Start Your Journey</span>
              </Badge>
            </motion.div>

            {/* Headline with Italic Accent */}
            <motion.h2
              id="final-cta-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Ready to secure your{" "}
              <span className="italic text-gradient-primary">
                transactions?
              </span>
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of users who trust SafeTrust for secure,
              transparent, and decentralized transactions. Get started in
              minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary CTA - Connect Wallet */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <button
                  onClick={handleConnectWallet}
                  className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Connect your wallet to get started"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-400 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
                  
                  <Wallet className="w-5 h-5" aria-hidden="true" />
                  <span>Connect Wallet</span>
                  <motion.div
                    className="inline-block"
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { x: [0, 4, 0] }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                </button>
              </motion.div>

              {/* Secondary CTA - Read the Docs */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <button
                  onClick={handleReadDocs}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white/30 hover:border-primary/50 hover:bg-white/5 text-white font-semibold text-lg rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Read the documentation"
                >
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  <span>Read the Docs</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>$50M+ Secured</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
}

export default FinalCTASection;
