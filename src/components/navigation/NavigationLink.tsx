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
    ? "block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-blue-900/20 focus:outline-none focus:bg-blue-900/20 focus:text-white focus:border-b-2 focus:border-blue-400 transition-all duration-300 rounded-md mx-2"
    : "text-gray-300 hover:text-white focus:outline-none focus:text-white focus:border-b-2 focus:border-blue-400 transition-all duration-300 px-2 py-1 relative";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default NavigationLink;
