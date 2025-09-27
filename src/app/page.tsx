"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/Tooltip";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Quick Tooltip Test Section */}
      <div className="bg-[#0a0a15] py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">✅ Tooltip Component Working!</p>
          <Tooltip content="This explains the feature">
            <Button className="bg-green-600 hover:bg-green-700">
              Hover me
            </Button>
          </Tooltip>
        </div>
      </div>
      
      <Discover />
      <HowItWorksSection /> 
      <FaqSection />
      <TransactionTiers />
      <Footer />
      
    </>
  );
}
