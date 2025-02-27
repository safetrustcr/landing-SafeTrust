"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Cog } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WhatWeOffer: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Deposit Protection',
      description:
        'Your deposit money is securely held in escrow, ensuring that it is only released once all rental conditions are met.',
      icon: <Shield className="w-12 h-12" />
    },
    {
      title: 'Verified Agreements',
      description:
        'All rental agreements are securely verified through blockchain technology, ensuring both parties are protected.',
      icon: <FileCheck className="w-12 h-12" />
    },
    {
      title: 'Automated Rentals',
      description:
        'Our platform automates the rental process, ensuring smooth transactions from start to finish with smart contracts.',
      icon: <Cog className="w-12 h-12" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3
      }
    },
    hover: { 
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      color: "#3B82F6",
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="bg-[#0a0a0a] text-white px-8 md:px-16 py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-600 filter blur-3xl opacity-5"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-600 filter blur-3xl opacity-5"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-200 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how SafeTrust ensures secure, transparent, and automated rental experiences <br />
          for both tenants and landlords, with a focus on protecting your deposit money.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl rounded-lg p-8 text-center border border-gray-700 relative overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
            >
              {/* Animated gradient border */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400" 
                  style={{ 
                    backgroundSize: "200% 200%",
                    animation: "gradientAnimation 3s linear infinite"
                  }}
                />
              </motion.div>

              <motion.div 
                className="text-blue-400 mb-6 relative mx-auto w-16 h-16 flex items-center justify-center"
                variants={iconVariants}
                whileHover="hover"
              >
                {service.icon}
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-blue-500 opacity-10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              
              <motion.h3 
                className="text-white text-2xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {service.description}
              </motion.p>
              
              {/* Interactive corner accents */}
              <motion.div 
                className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-30"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-[1px] h-6 bg-blue-400"></div>
                <div className="absolute top-0 right-0 h-[1px] w-6 bg-blue-400"></div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-30"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="absolute bottom-0 left-0 w-[1px] h-6 bg-blue-400"></div>
                <div className="absolute bottom-0 left-0 h-[1px] w-6 bg-blue-400"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Add a style tag for keyframes animations */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default WhatWeOffer;