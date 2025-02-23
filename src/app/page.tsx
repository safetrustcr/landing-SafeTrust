"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FaqSection />
      <TransactionTiers/>
    </>
  );
}
