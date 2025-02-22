"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="container max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
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
            className="border rounded-lg border-gray-800 px-2 data-[state=open]:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="hover:text-primary">
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
            className="border rounded-lg border-gray-800 px-2 data-[state=open]:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="hover:text-primary">
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
            className="border rounded-lg border-gray-800 px-2 data-[state=open]:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="hover:text-primary">
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
            className="border rounded-lg border-gray-800 px-2 data-[state=open]:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="hover:text-primary">
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
            className="border rounded-lg border-gray-800 px-2 data-[state=open]:border-primary/50 transition-colors"
          >
            <AccordionTrigger className="hover:text-primary">
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