"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TestimonialSection />
      <Discover />
      <FaqSection />
      <TransactionTiers/>
      <Footer />
      </>
  );
}
