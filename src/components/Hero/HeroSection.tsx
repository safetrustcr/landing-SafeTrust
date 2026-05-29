"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Lock, ChevronDown, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import WalletModal from "@/components/wallet/WalletModal";
import { useWallet } from "@/hooks/use-wallet";
import { 
  HeroAnimation, 
  AnimatedHeadline, 
  AnimatedSubheading,
  FloatingParticles,
  GlowingOrb,
} from "./HeroAnimation";
import { CTAButtons } from "./CTAButtons";
import { TrustBadges, TrustBadgesCompact } from "./TrustBadges";
import { EscrowCard } from "./EscrowCard";
import styles from "@/styles/hero.module.css";

export interface HeroSectionProps {
  className?: string;
}

// Background Visual Component
function BackgroundVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.backgroundVisual} aria-hidden="true">
      {/* Gradient Mesh */}
      <div className={styles.gradientMesh} />
      
      {/* Grid Pattern */}
      <div className={styles.gridPattern} />
      
      {/* Floating Particles - only show if motion allowed */}
      {!prefersReducedMotion && <FloatingParticles />}
      
      {/* Glowing Orbs */}
      <GlowingOrb color="primary" size="xl" position={{ x: 70, y: 30 }} />
      <GlowingOrb color="secondary" size="lg" position={{ x: 20, y: 70 }} />
      <GlowingOrb color="accent" size="md" position={{ x: 80, y: 80 }} />
    </div>
  );
}

// Escrow Card Visual Component (Right side interactive card)
function EscrowCardVisual() {
  return (
    <div className={styles.escrowCardContainer} aria-hidden="true">
      <EscrowCard />
    </div>
  );
}

// Scroll Indicator Component
function ScrollIndicator() {
  const handleScrollDown = () => {
    const featuresSection = document.getElementById("features") || document.getElementById("discover");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      className={styles.scrollIndicator}
      onClick={handleScrollDown}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      aria-label="Scroll down to see more content"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}

// Secondary CTA Section Component (like the original hero)
interface SecondaryCTASectionProps {
  onConnectWallet: () => void;
  onLearnMore: () => void;
  isConnected: boolean;
  isConnecting: boolean;
}

function SecondaryCTASection({ onConnectWallet, onLearnMore, isConnected, isConnecting }: SecondaryCTASectionProps) {
  const getButtonConfig = () => {
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

  const buttonConfig = getButtonConfig();

  return (
    <section className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 py-6 relative z-10">
      {/* Banner card with gradient background */}
      <motion.div
        className="rounded-2xl bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-white/5 dark:to-[#2857B8]/10 backdrop-blur-sm border border-blue-100 dark:border-[#2857B8]/20 shadow-lg px-8 py-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2857B8] mb-3">
          Our promise
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
          Secure, transparent, trusted.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Decentralized escrow that holds every deposit until both parties confirm — no middlemen, no surprises.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button 
          onClick={buttonConfig.disabled ? undefined : onConnectWallet}
          disabled={buttonConfig.disabled}
          className={buttonConfig.className}
        >
          <Lock className="w-5 h-5" />
          {buttonConfig.text}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <button 
          onClick={onLearnMore}
          className="group border-2 border-border hover:border-purple-500 text-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-purple-500/10 flex items-center gap-3 text-lg"
        >
          Learn More
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>


    </section>
  );
}

// Main Hero Section Component
export function HeroSection({ className = "" }: HeroSectionProps) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Wallet connection state
  const { isConnected, isConnecting, error } = useWallet();

  // Handlers
  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  const handleGetStarted = () => {
    if (!isConnected) {
      openWalletModal();
    } else {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchDemo = () => {
    // Could open a demo video modal
    console.log("Watch demo clicked");
  };

  return (
    <section 
      ref={heroRef}
      className={`${styles.heroSection} ${className}`}
      id="hero"
      aria-label="Hero section - SafeTrust secure P2P transactions platform"
    >
      {/* Skip to Content Link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Background Visual */}
      <motion.div 
        style={prefersReducedMotion ? {} : { y: backgroundY }}
        className="absolute inset-0"
      >
        <BackgroundVisual />
      </motion.div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <motion.main
        id="main-content"
        className={styles.heroContainer}
        style={prefersReducedMotion ? {} : { y: contentY, opacity }}
      >
        <div className={styles.heroContent}>
          <HeroAnimation>
            {/* Stellar Mainnet Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-cyan-700/50 rounded-full mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star className="w-4 h-4 text-cyan-600 dark:text-cyan-400 fill-cyan-600 dark:fill-cyan-400" />
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                Live on Stellar mainnet
              </span>
            </motion.div>

            {/* Headline with italic accent */}
            <AnimatedHeadline
              text="Secure deposits. Zero intermediaries. P2P escrow you can "
              highlight="actually trust."
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground"
              highlightClassName={`${styles.headlineHighlight} italic`}
            />

            {/* Subheading */}
            <AnimatedSubheading 
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              delay={0.4}
            >
              SafeTrust holds your funds in tamper-proof blockchain escrow on Stellar — 
              automatically released when both parties agree. No banks, no middlemen, no risk.
            </AnimatedSubheading>

            {/* CTA Buttons */}
            <CTAButtons
              onGetStarted={handleGetStarted}
              onLearnMore={handleLearnMore}
              onWatchDemo={handleWatchDemo}
              className="mt-4"
            />

            {/* Trust Badges */}
            <TrustBadges className="mt-8" />
          </HeroAnimation>

          {/* Error display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg max-w-md"
            >
              <p className="text-destructive text-sm">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Escrow Card Visual */}
        <EscrowCardVisual />
      </motion.main>

      {/* Secondary CTA Section (like the original hero) */}
      <SecondaryCTASection 
        onConnectWallet={openWalletModal}
        onLearnMore={handleLearnMore}
        isConnected={isConnected}
        isConnecting={isConnecting}
      />

      {/* Compact Trust Badges at Bottom */}
      <motion.div 
        className="relative z-10 pb-20 pt-8"
        style={prefersReducedMotion ? {} : { opacity }}
      >
        <TrustBadgesCompact className="px-4" />
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Wallet Modal */}
      <WalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
    </section>
  );
}

export default HeroSection;
