"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Discover />
      <HowItWorksSection />
      <FaqSection />
      <TransactionTiers />
      <Footer />
    </>
  );
}
