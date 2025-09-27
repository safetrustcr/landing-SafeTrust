"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  href, 
  children, 
  onClick,
  className = "",
  isMobile = false
}) => {
  const baseClasses = isMobile 
    ? "block px-4 py-3 text-lg font-medium text-foreground/80 dark:text-foreground/80 hover:text-foreground dark:hover:text-foreground hover:bg-blue-600/10 dark:hover:bg-blue-400/10 focus:outline-none focus:bg-blue-600/10 dark:focus:bg-blue-400/10 focus:text-foreground dark:focus:text-foreground focus:border-b-2 focus:border-blue-400 dark:focus:border-blue-300 transition-all duration-300 rounded-md mx-2"
    : "text-foreground/80 dark:text-foreground/80 hover:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:text-blue-400 dark:focus:text-blue-300 focus:border-b-2 focus:border-blue-400 dark:focus:border-blue-300 transition-all duration-300 px-2 py-1 relative";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Smooth scroll to section
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Call onClick if provided (for closing mobile menu)
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href}
        onClick={handleClick}
        className={`${baseClasses} ${className}`}
      >
        {children}
        {/* Hover underline effect for desktop links */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-blue-400 dark:bg-blue-300"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default NavigationLink;