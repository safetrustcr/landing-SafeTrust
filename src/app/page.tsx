"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SecuritySection from "@/components/SecuritySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Discover />
      <HowItWorksSection />
      <SecuritySection />
      <FaqSection />
      <TransactionTiers />
      <Footer />
    </>
  );
}
