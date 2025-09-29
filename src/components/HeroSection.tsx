"use client";

import React from "react";
import { ArrowRight, Shield, Lock } from "lucide-react";

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

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section className="hero-section relative min-h-screen bg-[#0a0a15] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 21, 0.7), rgba(10, 10, 21, 0.5)), url('/img/hero/security-box-usdt.png')`,
        }}
      />

      {/* Content Container */}
      <div className="hero-content relative z-10 flex flex-col justify-center min-h-[80vh] w-full">
        <div className="content-wrapper w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          {/* Brand Logo/Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Safe
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Trust
                </span>
              </h1>
            </div>
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
