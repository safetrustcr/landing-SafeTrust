"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Github, 
  Youtube,
  ChevronUp
} from 'lucide-react';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3
      }
    }
  };

  const logoVariants = {
    animate: {
      textShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white py-12 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-[#0a0a0a] pointer-events-none" />
      
      {/* Mesh pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zm20.76 35.52l2.83-2.83 1.41 1.41L22.17 40h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zm20.76 35.52l2.83-2.83 1.41 1.41L31.17 40h-1.41v-1.41zM21.41 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM3.07 20.83l2.83-2.83 1.41 1.41-2.83 2.83H3.07v-1.41zm17.69 0l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      />

      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute right-4 top-0 bg-blue-600 rounded-full p-2 shadow-lg shadow-blue-900/20"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChevronUp size={16} />
        </motion.button>

        <motion.div 
          className="text-4xl font-bold"
          variants={itemVariants}
        >
          <motion.span variants={logoVariants} animate="animate">
            Safe<span className="text-blue-500">Trust</span>
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex justify-center space-x-6 text-3xl"
          variants={itemVariants}
        >
          <motion.a 
            href="#" 
            className="text-white hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            variants={iconVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Facebook size={24} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            variants={iconVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            variants={iconVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Twitter size={24} />
          </motion.a>
          <motion.a 
            href="https://github.com/safetrustcr" 
            className="text-white hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            variants={iconVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white hover:text-blue-400 bg-gray-800 p-3 rounded-full"
            variants={iconVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Youtube size={24} />
          </motion.a>
        </motion.div>

        <motion.div
          className="relative"
          variants={itemVariants}
        >
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p 
            className="text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ensuring secure, decentralized property transfers <br /> with smart contracts and verified signatures.
          </motion.p>
        </motion.div>

        <motion.div 
          className="text-xs text-gray-500 pt-4"
          variants={itemVariants}
        >
          Powered by <span className="text-white">Safe Trust</span>
          <span className="text-blue-500"> </span>© {currentYear}
        </motion.div>
        
        {/* Navigation links */}
        <motion.div 
          className="flex justify-center space-x-8 text-sm text-gray-400 pt-2"
          variants={itemVariants}
        >
          <motion.a 
            href="#" 
            className="hover:text-blue-400 transition duration-200"
            whileHover={{ y: -2 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-blue-400 transition duration-200"
            whileHover={{ y: -2 }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-blue-400 transition duration-200"
            whileHover={{ y: -2 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;