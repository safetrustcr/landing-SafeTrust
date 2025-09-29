import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ Reusable social links config
const socialLinks = [
  {
    href: "#",
    svg: <path d="M23.643 4.937c-.835.37-1.732.62-2.675..." />,
  },
  {
    href: "#",
    svg: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14..." />,
  },
  {
    href: "#",
    svg: <path d="M12 0c-6.626 0-12 5.373-12 12 0..." />,
  },
  {
    href: "#",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85..." />,
  },
];

// ✅ Reusable footer columns config
const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/about", label: "About" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/team", label: "Team" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
      { href: "/contact-us", label: "Contact Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/documentation", label: "Documentation" },
      { href: "/help-center", label: "Help Center" },
      { href: "/security", label: "Security" },
      { href: "/api", label: "API" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookie", label: "Cookie Policy" },
      { href: "/acceptable-use", label: "Acceptable Use" },
      { href: "/refund", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 relative overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none transition-colors duration-300"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header area with logo + subscribe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-4 gap-y-8 mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-6 h-6 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                SafeTrust
              </span>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-2">
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

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {s.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 SafeTrust. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {s.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
