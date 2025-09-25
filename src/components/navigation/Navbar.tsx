"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HamburgerButton from '@/components/ui/hamburger-button';
import MobileMenu from './MobileMenu';
import NavigationLink from './NavigationLink';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('laptop');
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
        setScreenSize('desktop');
      } else if (window.innerWidth >= 1366) {
        setScreenSize('laptop');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else if (window.innerWidth >= 320) {
        setScreenSize('mobile');
      } else {
        setScreenSize('mobile');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigationItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '#support', label: 'Support' }
  ];

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 py-4 relative z-10 laptop:container laptop:mx-auto bg-[#0a0a15]/80 backdrop-blur-sm border-b border-blue-800/20">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-8 w-8 rounded-lg bg-blue-600" />
          <span className="text-xl font-semibold">SafeTrust</span>
        </motion.div>

        {/* Desktop Navigation - Full navigation for laptop and above */}
        <div className="hidden laptop:flex items-center gap-6">
          {navigationItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              className="hover:text-blue-400 transition-colors duration-300"
            >
              {item.label}
            </NavigationLink>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-blue-600 text-blue-500 hover:bg-blue-900/20 hover:text-white focus:outline-none focus:bg-blue-900/20 focus:text-white focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/25 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Tablet Navigation - Only Get Started button outside, all links in hamburger */}
        <div className="hidden tablet:flex laptop:hidden items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-blue-600 text-blue-500 hover:bg-blue-900/20 hover:text-white text-sm px-4 py-2 focus:outline-none focus:bg-blue-900/20 focus:text-white focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/25 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="tablet:hidden">
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu - Only show for mobile and tablet */}
      {isClient && (screenSize === 'mobile' || screenSize === 'tablet') && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isTablet={screenSize === 'tablet'}
        />
      )}
    </>
  );
};

export default Navbar;
