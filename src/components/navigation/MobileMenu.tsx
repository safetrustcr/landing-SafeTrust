"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NavigationLink from "./NavigationLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isTablet?: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeSection, setActiveSection, isTablet = false }) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('mobile');
  const [isClient, setIsClient] = useState(false);

  // Detect screen size - only on client side
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      if (window.innerWidth >= 1920) {
        setScreenSize("desktop");
      } else if (window.innerWidth >= 1366) {
        setScreenSize("laptop");
      } else if (window.innerWidth >= 768) {
        setScreenSize("tablet");
      } else if (window.innerWidth >= 320) {
        setScreenSize("mobile");
      } else {
        setScreenSize("mobile");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOnClick = (section: string) => {
    setActiveSection(section);
    onClose();
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: 320,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const allNavigationItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/icons", label: "Icons" },
    { href: "#support", label: "Support" },
  ];

  // For tablet, show all navigation items in hamburger menu
  // For laptop and desktop, mobile menu should not be used
  const navigationItems = allNavigationItems;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <motion.nav
            className={`fixed top-0 right-0 h-full bg-background dark:bg-background border-l border-border dark:border-border z-50 overflow-hidden transition-colors duration-300 ${
              isClient && screenSize === "tablet" ? "w-64" : "w-80"
            }`}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            id="mobile-menu"
            aria-label="Main navigation"
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border dark:border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                    SafeTrust
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted dark:hover:bg-muted rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-foreground dark:text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 overflow-y-auto">
                <motion.div
                  className="space-y-2 px-2"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  initial="closed"
                  animate="open"
                >
                  {navigationItems.map((item) => (
                    <motion.div key={item.href} variants={linkVariants}>
                      <NavigationLink
                        href={item.href}
                        onClick={() => handleOnClick(item.href)}
                        isMobile={true}
                        activeSection={activeSection === item.href}
                      >
                        {item.label}
                      </NavigationLink>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                className="p-6 border-t border-border dark:border-border flex-shrink-0"
                variants={linkVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600/10 dark:hover:bg-blue-400/10 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:bg-blue-600/10 dark:focus:bg-blue-400/10 focus:text-blue-700 dark:focus:text-blue-300 focus:border-blue-500 dark:focus:border-blue-300 focus:shadow-lg focus:shadow-blue-500/25 dark:focus:shadow-blue-400/25 transition-all duration-300"
                  onClick={onClose}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
