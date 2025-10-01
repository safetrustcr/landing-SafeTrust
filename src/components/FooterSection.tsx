import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-8 h-8 rounded mr-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
              SafeTrust
            </span>
          </div>

          <div className="flex flex-col sm:flex-row w-full max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-card border-border rounded-md w-full text-muted-foreground pl-4 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-colors duration-300"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 mt-2 sm:mt-0 transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-primary">About</a></li>
              <li><a href="/features" className="text-muted-foreground hover:text-primary">Features</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</a></li>
              <li><a href="/integrations" className="text-muted-foreground hover:text-primary">Integrations</a></li>
              <li><a href="/faqs" className="text-muted-foreground hover:text-primary">FAQs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><a href="/our-story" className="text-muted-foreground hover:text-primary">Our Story</a></li>
              <li><a href="/team" className="text-muted-foreground hover:text-primary">Team</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary">Careers</a></li>
              <li><a href="/press" className="text-muted-foreground hover:text-primary">Press</a></li>
              <li><a href="/contact-us" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="/documentation" className="text-muted-foreground hover:text-primary">Documentation</a></li>
              <li><a href="/help-center" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="/security" className="text-muted-foreground hover:text-primary">Security</a></li>
              <li><a href="/api" className="text-muted-foreground hover:text-primary">API</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="/cookie" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
              <li><a href="/acceptable-use" className="text-muted-foreground hover:text-primary">Acceptable Use</a></li>
              <li><a href="/refund" className="text-muted-foreground hover:text-primary">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 SafeTrust. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {/* Social media icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
