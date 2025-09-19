"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import NavigationLink from './NavigationLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isTablet?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isTablet = false }) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('mobile');

  // Detect screen size
  useEffect(() => {
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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const allNavigationItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#support', label: 'Support' }
  ];

  // For tablet, show only the items not visible in the main nav
  // For laptop and desktop, mobile menu should not be used
  const navigationItems = screenSize === 'tablet' ? allNavigationItems.slice(3) : allNavigationItems;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            tabIndex={-1}
            aria-hidden="true"
          />
          
          {/* Mobile Menu */}
          <motion.nav
            className={`fixed top-0 right-0 h-full bg-[#0a0a15] border-l border-blue-900/30 z-50 overflow-hidden ${
              screenSize === 'tablet' ? 'w-64' : 'w-80'
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
              <div className="flex items-center justify-between p-6 border-b border-blue-900/30">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-600" />
                  <span className="text-xl font-semibold">SafeTrust</span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 overflow-y-auto">
                <motion.div
                  className="space-y-2 px-2"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                      }
                    }
                  }}
                  initial="closed"
                  animate="open"
                >
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={linkVariants}
                    >
                      <NavigationLink
                        href={item.href}
                        onClick={onClose}
                        isMobile={true}
                      >
                        {item.label}
                      </NavigationLink>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                className="p-6 border-t border-blue-900/30 flex-shrink-0"
                variants={linkVariants}
                initial="closed"
                animate="open"
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-500 hover:bg-blue-900/20 hover:text-white focus:outline-none focus:bg-blue-900/20 focus:text-white focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/25 transition-all duration-300"
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
