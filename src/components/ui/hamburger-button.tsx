"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ 
  isOpen, 
  onClick, 
  className = "" 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative z-50 flex flex-col justify-center items-center w-8 h-8 focus:outline-none focus:bg-blue-900/20 focus:border-b-2 focus:border-blue-400 rounded-md hover:bg-blue-900/20 transition-all duration-300 ${className}`}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="block w-6 h-0.5 bg-white rounded-sm"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-white rounded-sm mt-1"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-white rounded-sm mt-1"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default HamburgerButton;
