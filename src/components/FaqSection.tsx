"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white py-16 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5 pointer-events-none"></div>
      
      <div className="container max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-gray-400 text-lg">
            We&apos;ve compiled a list of the most frequently asked questions
            about SafeTrust to help you understand our P2P transaction platform
            better.
          </p>
        </div>

        <Accordion type="multiple" className="space-y-4">
          <AccordionItem
            value="item-1"
            className="border rounded-lg border-blue-900/20 px-2 data-[state=open]:border-blue-600/50 data-[state=open]:bg-blue-950/20 backdrop-blur-sm transition-colors"
          >
            <AccordionTrigger className="hover:text-blue-600">
              What is SafeTrust?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              SafeTrust is a decentralized P2P transaction platform that
              provides secure escrow services and safe deposit solutions using
              blockchain technology. Our platform ensures trust and security in
              every transaction between parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-lg border-blue-900/20 px-2 data-[state=open]:border-blue-600/50 data-[state=open]:bg-blue-950/20 backdrop-blur-sm transition-colors"
          >
            <AccordionTrigger className="hover:text-blue-600">
              How do I get started with SafeTrust?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Getting started with SafeTrust is easy! Simply connect your
              wallet, verify your account, and start using our secure P2P
              transaction features. Our intuitive interface and comprehensive
              onboarding process will guide you through each step.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-lg border-blue-900/20 px-2 data-[state=open]:border-blue-600/50 data-[state=open]:bg-blue-950/20 backdrop-blur-sm transition-colors"
          >
            <AccordionTrigger className="hover:text-blue-600">
              What security measures does SafeTrust use?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              SafeTrust employs multiple layers of security, including smart
              contracts, multi-signature wallets, and advanced encryption. Our
              blue-chip security standards ensure your assets are protected
              throughout every transaction.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border rounded-lg border-blue-900/20 px-2 data-[state=open]:border-blue-600/50 data-[state=open]:bg-blue-950/20 backdrop-blur-sm transition-colors"
          >
            <AccordionTrigger className="hover:text-blue-600">
              What are the transaction fees?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Our fees are transparent and competitive, starting from 0.5% per
              transaction for basic users. We offer tiered pricing based on
              transaction volume, with reduced rates for pro users and custom
              solutions for enterprise clients.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border rounded-lg border-blue-900/20 px-2 data-[state=open]:border-blue-600/50 data-[state=open]:bg-blue-950/20 backdrop-blur-sm transition-colors"
          >
            <AccordionTrigger className="hover:text-blue-600">
              Which blockchains does SafeTrust support?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              SafeTrust supports multiple blockchain networks including
              Ethereum, Stellar, and other major chains. This ensures maximum
              flexibility and accessibility for all your P2P transaction needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}