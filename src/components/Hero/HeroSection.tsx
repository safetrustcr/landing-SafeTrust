"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Shield, Lock, Wallet, ChevronDown } from "lucide-react";
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

// Security Visual Component (Right side illustration)
function SecurityVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.securityVisual} aria-hidden="true">
      <div className={styles.shieldContainer}>
        {/* Glow effect */}
        <div className={styles.shieldGlow} />
        
        {/* Orbit rings */}
        <motion.div 
          className={`${styles.orbitRing} ${styles.orbitRing1}`}
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${styles.orbitDot} ${styles.orbitDot1}`} />
        </motion.div>
        
        <motion.div 
          className={`${styles.orbitRing} ${styles.orbitRing2}`}
          animate={prefersReducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${styles.orbitDot} ${styles.orbitDot2}`} />
        </motion.div>
        
        <motion.div 
          className={`${styles.orbitRing} ${styles.orbitRing3}`}
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${styles.orbitDot} ${styles.orbitDot3}`} />
        </motion.div>
        
        {/* Central Shield */}
        <motion.div 
          className={styles.shieldCore}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-primary to-blue-600 p-8 rounded-3xl shadow-2xl shadow-primary/30">
              <Shield className="w-20 h-20 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
        
        {/* Floating Cards */}
        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-foreground">Encrypted</span>
          </div>
        </motion.div>
        
        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard2}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-foreground">$2.5M Secured</span>
          </div>
        </motion.div>
        
        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard3}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Live Protection</span>
          </div>
        </motion.div>
      </div>
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
      <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.button>
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
  const { isConnected, isConnecting, account, error } = useWallet();

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
            {/* Headline */}
            <AnimatedHeadline
              text="SafeTrust Secure Rentals"
              highlight="Secure"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground"
              highlightClassName={styles.headlineHighlight}
            />

            {/* Subheading */}
            <AnimatedSubheading 
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              delay={0.4}
            >
              Blockchain-powered trust for every transaction. Experience the power of 
              decentralized security with our revolutionary P2P escrow platform.
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

        {/* Security Visual */}
        <SecurityVisual />
      </motion.main>

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
