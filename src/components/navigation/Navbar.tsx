"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HamburgerButton from "@/components/ui/hamburger-button";
import MobileMenu from "./MobileMenu";
import NavigationLink from "./NavigationLink";
import { ThemeToggle } from "../theme-toggle";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "laptop" | "desktop"
  >("laptop");
  const [isClient, setIsClient] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

  const navigationItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "#support", label: "Support" },
  ];

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 py-4 relative z-10 laptop:container laptop:mx-auto bg-background/80 backdrop-blur-md border-b border-border/50 transition-colors duration-300">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent transition-colors duration-300">
            SafeTrust
          </span>
        </motion.div>

        {/* Desktop Navigation - Full navigation for laptop and above */}
        <div className="hidden laptop:flex items-center gap-6">
          {navigationItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
            >
              {item.label}
            </NavigationLink>
          ))}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600/10 dark:hover:bg-blue-400/10 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:bg-blue-600/10 dark:focus:bg-blue-400/10 focus:text-blue-700 dark:focus:text-blue-300 focus:border-blue-500 dark:focus:border-blue-300 focus:shadow-lg focus:shadow-blue-500/25 dark:focus:shadow-blue-400/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Tablet Navigation - Theme toggle, Get Started button, and hamburger */}
        <div className="hidden tablet:flex laptop:hidden items-center gap-3">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600/10 dark:hover:bg-blue-400/10 hover:text-blue-700 dark:hover:text-blue-300 text-sm px-4 py-2 focus:outline-none focus:bg-blue-600/10 dark:focus:bg-blue-400/10 focus:text-blue-700 dark:focus:text-blue-300 focus:border-blue-500 dark:focus:border-blue-300 focus:shadow-lg focus:shadow-blue-500/25 dark:focus:shadow-blue-400/25 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Mobile Navigation - Theme toggle and hamburger */}
        <div className="tablet:hidden flex items-center gap-3">
          <ThemeToggle />
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu - Only show for mobile and tablet */}
      {isClient && (screenSize === "mobile" || screenSize === "tablet") && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isTablet={screenSize === "tablet"}
        />
      )}
    </>
  );
};

export default Navbar;
