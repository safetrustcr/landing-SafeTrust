"use client";

import * as React from "react";
import { NewsletterForm } from "@/components/Newsletter";

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 relative overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none transition-colors duration-300"></div>



      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header area with logo and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="flex items-center mb-6 md:mb-0">
            <Image
              src="/landing-logo.jpeg"
              alt="SafeTrust"
              width={32}
              height={32}
              className="rounded object-cover mr-3"
            />
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
              SafeTrust
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-8 gap-y-8 mb-12">
          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src="/landing-logo.jpeg"
                alt="SafeTrust"
                width={24}
                height={24}
                className="rounded object-cover mr-2"
              />
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                SafeTrust
              </span>
            </div>
            <NewsletterForm variant="compact" />
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-200">About</a></li>
              <li><a href="/features" className="text-muted-foreground hover:text-primary transition-colors duration-200">Features</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200">Pricing</a></li>
              <li><a href="/integrations" className="text-muted-foreground hover:text-primary transition-colors duration-200">Integrations</a></li>
              <li><a href="/faqs" className="text-muted-foreground hover:text-primary transition-colors duration-200">FAQs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><a href="/our-story" className="text-muted-foreground hover:text-primary transition-colors duration-200">Our Story</a></li>
              <li><a href="/team" className="text-muted-foreground hover:text-primary transition-colors duration-200">Team</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors duration-200">Careers</a></li>
              <li><a href="/press" className="text-muted-foreground hover:text-primary transition-colors duration-200">Press</a></li>
              <li><a href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200">Blog</a></li>
              <li><a href="/documentation" className="text-muted-foreground hover:text-primary transition-colors duration-200">Documentation</a></li>
              <li><a href="/help-center" className="text-muted-foreground hover:text-primary transition-colors duration-200">Help Center</a></li>
              <li><a href="/security" className="text-muted-foreground hover:text-primary transition-colors duration-200">Security</a></li>
              <li><a href="/api" className="text-muted-foreground hover:text-primary transition-colors duration-200">API</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/cookie" className="text-muted-foreground hover:text-primary transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="/acceptable-use" className="text-muted-foreground hover:text-primary transition-colors duration-200">Acceptable Use</a></li>
              <li><a href="/refund" className="text-muted-foreground hover:text-primary transition-colors duration-200">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 SafeTrust. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {/* Social Media Links */}
          </div>
        </div>
      </div>
    </footer>
  );
}
