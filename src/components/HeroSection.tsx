"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-xl font-semibold">SafeTrust</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-gray-300 hover:text-white">
            Features
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white">
            Pricing
          </a>
          <a href="#support" className="text-gray-300 hover:text-white">
            Support
          </a>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 hover:text-white"
          >
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto grid min-h-[calc(100vh-80px)] grid-cols-1 gap-12 px-4 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-primary">Secure</span> p2p
            <span className="block">transactions platform</span>
          </h1>
          <p className="text-xl text-gray-400">
            Experience the power of decentralized trust and seamless blockchain
            transactions. Our blue-chip security standards ensure your deposits
            are always protected in our revolutionary P2P platform.
          </p>
          <div className="flex max-w-md items-center">
            <Button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 text-lg flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={i}
                className="h-24 w-24 rounded-lg bg-primary/20 p-4"
                style={{
                  animation: `pulse 2s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}