"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  role2: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Josué Brenes',
      role: 'Co-founder',
      role2: 'Frontend Developer',
      image: '/img/brenes.jpg'
    },
    {
      name: 'Randall Valenciano',
      role: 'Co-founder',
      role2: 'Fullstack Developer',
      image: '/img/randall.jpg'
    },
    {
      name: 'Diego Duarte',
      role: 'Co-founder',
      role2: 'Fullstack Developer',
      image: '/img/diego.jpg'
    },
    {
      name: 'Anwar Sanchez',
      role: '',
      role2: 'Full Stack Developer',
      image: '/img/humberto.jpg'
    },
    {
      name: 'Josué Soto',
      role: 'Co-founder',
      role2: 'Backend Developer',
      image: '/img/soto.jpg'
    }
  ];

  const colors = ['bg-[#344153]', 'bg-[#28313E]', 'bg-[#334050]', 'bg-[#283440]', 'bg-[#405164]'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        damping: 12
      }
    },
    hover: { 
      y: -10,
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="team" className="py-24 bg-[#0a0a0a] overflow-hidden">
      <motion.div 
        className="relative max-w-7xl mx-auto text-center px-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
        <motion.p 
          className="text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Our talented team is committed to building reliable and innovative solutions for your organization.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className={`flex flex-col justify-between h-full rounded-lg shadow-lg overflow-hidden ${colors[index]} max-w-60 mx-auto`}
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div 
                className="p-6 flex-grow"
                variants={textVariants}
              >
                <h3 className="text-xl font-bold mb-1 text-white">{member.name.toUpperCase()}</h3>
                {member.role && <p className="text-sm mb-1 text-white">{member.role}</p>}
                <p className="text-sm mb-4 text-white">{member.role2}</p>
              </motion.div>
              <motion.div 
                className="relative w-full h-64"
                variants={imageVariants}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-64 object-contain"
                />
              </motion.div>
              
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div 
                  className="absolute inset-x-0 top-0 h-0.5 bg-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-y-0 right-0 w-0.5 bg-blue-400"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute inset-y-0 left-0 w-0.5 bg-blue-400"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -z-10">
          <motion.div 
            className="w-64 h-64 rounded-full bg-blue-100 opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 -z-10">
          <motion.div 
            className="w-40 h-40 rounded-full bg-blue-200 opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;