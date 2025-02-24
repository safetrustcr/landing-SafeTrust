"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FaqSection />
      <Discover />
      <Footer />
    </>
  );
}
