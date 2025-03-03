"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView as framerUseInView } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, Clock, DollarSign, Lock } from 'lucide-react';

// Types for components
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

interface AnimatedCircleProps {
  delay: number;
  size: number;
  position: {
    top: string | number;
    left: string | number;
  };
  opacity: number;
}

interface ConnectingLineProps {
  index: number;
}

interface BusinessBenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = framerUseInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-800/20 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

// Animated circle that moves with scroll
const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ delay, size, position, opacity }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-blue-600 filter blur-xl pointer-events-none`}
      style={{
        width: size,
        height: size,
        ...position,
        opacity: 0,
      }}
      animate={{
        opacity: [0, opacity, 0],
        x: [position.left as number - 20, position.left as number + 20, position.left as number],
        y: [position.top as number - 20, position.top as number + 20, position.top as number],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

// Animated connecting lines
const ConnectingLine: React.FC<ConnectingLineProps> = ({ index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = framerUseInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: "100%",
        transition: { duration: 0.8, delay: index * 0.3 }
      });
    }
  }, [controls, isInView, index]);

  return (
    <div className="hidden md:flex items-center justify-center col-span-1">
      <motion.div
        ref={ref}
        initial={{ width: 0 }}
        animate={controls}
        className="h-0.5 bg-gradient-to-r from-blue-600/30 to-blue-600/80 w-full"
      />
    </div>
  );
};

// Business benefits component
const BusinessBenefit: React.FC<BusinessBenefitProps> = ({ title, description, icon, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = framerUseInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex flex-col items-center text-center p-4"
    >
      <motion.div
        className="mb-4 text-blue-500"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const HowItWorksSection: React.FC = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const ref = useRef(null);
  const isInView = framerUseInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      setPlayAnimation(true);
    }
  }, [isInView]);

  const steps = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Create Security Deposit",
      description: "Set up your escrow with customizable security parameters for your business transactions.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "Automated Hold Period",
      description: "Funds are automatically held in secure smart contracts until conditions are met.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
      title: "Verification Process",
      description: "All transactions undergo our proprietary verification process to ensure legitimacy.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-blue-400" />,
      title: "Seamless Transfer",
      description: "Upon successful completion, funds are instantly released to the appropriate party.",
    },
  ];

  const benefits = [
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Reduced Risk",
      description: "Eliminate payment disputes and fraud with our secure deposit system.",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Save Time",
      description: "Automate payment verification and release without manual intervention.",
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Increase Cash Flow",
      description: "Guarantee payments and improve your business's financial predictability.",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Build Trust",
      description: "Offer clients peace of mind with transparent, secure transaction processes.",
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="min-h-screen bg-[#0a0a15] py-24 px-6 md:px-16 relative overflow-hidden"
      ref={ref}
    >
      {/* Background elements */}
      <AnimatedCircle delay={0} size={100} position={{ top: "10%", left: "5%" }} opacity={0.1} />
      <AnimatedCircle delay={3} size={150} position={{ top: "60%", left: "85%" }} opacity={0.08} />
      <AnimatedCircle delay={5} size={80} position={{ top: "80%", left: "20%" }} opacity={0.07} />
      <AnimatedCircle delay={2} size={120} position={{ top: "30%", left: "70%" }} opacity={0.05} />

      <div className="container mx-auto z-10 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={playAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            How It <span className="text-blue-500">Works</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={playAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Our security deposit system simplifies transactions and protects your business 
            with blockchain-powered escrow technology.
          </motion.p>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-20">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepCard 
                icon={step.icon} 
                title={step.title} 
                description={step.description} 
                index={index} 
              />
              {index < steps.length - 1 && <ConnectingLine index={index} />}
            </React.Fragment>
          ))}
        </div>

        {/* Business Benefits */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={playAnimation ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">
            Making Your <span className="text-blue-500">Business Life Easier</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {benefits.map((benefit, index) => (
              <BusinessBenefit
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-medium mb-6 text-white">
            Ready to secure your business transactions?
          </h3>
          <motion.button
            className="bg-blue-600 text-white py-3 px-8 rounded-lg flex items-center gap-2 mx-auto hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;