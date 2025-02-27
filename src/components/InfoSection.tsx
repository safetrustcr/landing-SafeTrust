"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Lock, RefreshCw } from 'lucide-react';

const InfoSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const iconAnimations = {
    shield: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 3, repeatType: "reverse" }
    },
    lock: {
      rotate: [0, 10, 0, -10, 0],
      transition: { repeat: Infinity, duration: 5, repeatType: "reverse" }
    },
    refresh: {
      rotate: [0, 360],
      transition: { repeat: Infinity, duration: 10, ease: "linear" }
    }
  };

  return (
    <section 
      id="info" 
      ref={sectionRef}
      className="bg-[#0a0a0a] text-white px-8 md:px-16 py-32 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-800 filter blur-3xl opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-indigo-600 filter blur-3xl opacity-5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.07, 0.05]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="flex flex-col justify-center"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Renting made safe with <br /> blockchain technology.
          </motion.h2>

          <motion.div 
            className="flex space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div 
              className="bg-gray-800 p-4 rounded-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div animate={iconAnimations.shield}>
                <Shield size={32} className="text-blue-400" />
              </motion.div>
              <p className="text-sm mt-2 text-gray-300">Deposit Protection</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-4 rounded-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div animate={iconAnimations.lock}>
                <Lock size={32} className="text-blue-400" />
              </motion.div>
              <p className="text-sm mt-2 text-gray-300">Secure Transactions</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-4 rounded-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div animate={iconAnimations.refresh}>
                <RefreshCw size={32} className="text-blue-400" />
              </motion.div>
              <p className="text-sm mt-2 text-gray-300">Automated Process</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-lg leading-relaxed flex flex-col justify-center"
          variants={itemVariants}
        >
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Decorative line */}
            <motion.div 
              className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-full opacity-80"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            
            <div className="pl-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                SafeTrust leverages blockchain-powered smart contracts to ensure secure and risk-free apartment rentals.
                With our system, your deposit money is protected, and transactions are made fully transparent, giving both
                tenants and landlords peace of mind.
              </motion.p>
              
              <motion.p 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                This innovative solution automates the rental process, ensuring that funds are held securely in escrow until
                all conditions are met. Once both parties have fulfilled their obligations, the deposit is released safely,
                guaranteeing a fair and reliable rental experience.
              </motion.p>
              
              <motion.div 
                className="mt-8 inline-flex"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-lg shadow-blue-900/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="ml-2">
                    <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Code blocks with glow effect */}
      <motion.div 
        className="absolute -bottom-10 right-10 opacity-30 w-96 h-32"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <pre className="text-blue-500 text-xs">
          <code>
            {`
contract SafeTrustEscrow {
  address public tenant;
  address public landlord;
  uint public deposit;
  bool public conditionsMet;
            `}
          </code>
        </pre>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 filter blur-2xl -z-10 opacity-10"
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </motion.div>
    </section>
  );
};

export default InfoSection;