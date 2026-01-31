"use client";

import { FeatureCard } from "@/components/cards/FeatureCard";
import {
  AnimatedGlobe,
  AnimatedShieldCheck,
  AnimatedDollarSign,
  AnimatedClock,
  AnimatedBrain,
  AnimatedLink2,
} from "@/components/icons/AnimatedIcons";
import { useState } from "react";

const features = [
  {
    icon: AnimatedGlobe,
    title: "Cross-Chain Compatibility",
    description:
      "Whether you're using Ethereum, Stellar, or other blockchain networks, SafeTrust works seamlessly across multiple chains, ensuring maximum flexibility for your transactions.",
  },
  {
    icon: AnimatedShieldCheck,
    title: "Secure Escrow System",
    description:
      "Create and manage secure deposits with our advanced escrow system. Tailor SafeTrust to fit your unique transaction requirements and preferences.",
  },
  {
    icon: AnimatedDollarSign,
    title: "Asset Protection",
    description:
      "Rest easy knowing your assets are securely stored with blue-chip grade security protocols and multi-signature protection.",
  },
  {
    icon: AnimatedClock,
    title: "Real-Time Settlement",
    description:
      "Experience instant transaction settlements with our advanced blockchain infrastructure, ensuring quick and secure transfers.",
  },
  {
    icon: AnimatedBrain,
    title: "Smart Contracts",
    description:
      "Our AI-powered smart contracts automatically handle complex transactions, making it easy to set conditions and execute trades safely.",
  },
  {
    icon: AnimatedLink2,
    title: "DeFi Integration",
    description:
      "Connect with popular DeFi protocols and enhance your trading capabilities while maintaining security and trust.",
  },
];

export default function Discover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#0a0a15] transition-colors duration-300">
      <section className="text-center pt-16 px-6 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 pointer-events-none transition-colors duration-300"></div>
        <div className="absolute -left-20 top-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        <div className="absolute -right-20 top-40 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>

        <h2 className="text-4xl text-foreground font-bold relative z-10 transition-colors duration-300">
          Discover the Power of <span className="text-primary">SafeTrust</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto relative z-10 transition-colors duration-300">
          SafeTrust is engineered with cutting-edge blockchain technology
          designed to revolutionize the way you handle P2P transactions, secure
          deposits, and manage digital assets.
        </p>
      </section>

      <section className="py-16 px-6 md:px-12 text-foreground relative transition-colors duration-300">
        {/* Additional subtle glow effects */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
        <div className="absolute bottom-1/4 right-1/3 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>

        <div className="mt-12 space-y-6 relative z-10">
          {/* First row - 2 large cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.slice(0, 2).map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <FeatureCard
                  key={index}
                  icon={
                    <IconComponent
                      size={28}
                      isHovered={hoveredIndex === index}
                    />
                  }
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  variant="large"
                />
              );
            })}
          </div>

          {/* Second row - 4 small cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(2).map((feature, index) => {
              const IconComponent = feature.icon;
              const actualIndex = index + 2;
              return (
                <FeatureCard
                  key={actualIndex}
                  icon={
                    <IconComponent
                      size={28}
                      isHovered={hoveredIndex === actualIndex}
                    />
                  }
                  title={feature.title}
                  description={feature.description}
                  index={actualIndex}
                  variant="small"
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
