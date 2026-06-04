"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";
import testimonials from "@/data/testimonials";
import styles from "@/styles/testimonials.module.css";

const TestimonialsSection: React.FC = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      setPlayAnimation(true);
      controls.start("visible");
    }
  }, [isInView, controls]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const carouselVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`${styles.testimonialsSection} py-20 md:py-28 bg-background transition-colors duration-300`}
      aria-labelledby="testimonials-heading"
    >
      {/* Background overlay */}
      <div className={styles.backgroundOverlay} aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16 flex flex-col items-center"
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={headerVariants}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 rounded-full dark:bg-primary/10">
            Testimonials
          </div>

          <motion.h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-foreground font-serif tracking-tight"
            variants={headerVariants}
          >
            What our <span className="italic text-primary font-serif">users</span> say
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-sans mt-2"
            variants={subtitleVariants}
          >
            Join thousands of users who trust SafeTrust for their secure transactions.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 px-4"
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={subtitleVariants}
        >
          <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-card border border-border rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              10K+
            </div>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Happy Users
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-card border border-border rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              4.9
            </div>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Average Rating
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-card border border-border rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              $50M+
            </div>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Secured Deposits
            </div>
          </div>
        </motion.div>

        {/* Testimonials carousel */}
        <motion.div
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={carouselVariants}
        >
          <TestimonialCarousel
            testimonials={testimonials}
            autoPlayInterval={5000}
          />
        </motion.div>

        {/* Trust message */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={playAnimation ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted-foreground text-sm">
            Trusted by property owners, tenants, freelancers, and businesses
            worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
