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
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <motion.h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
            variants={headerVariants}
          >
            What Our <span className="text-primary">Users Say</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            variants={subtitleVariants}
          >
            Join thousands of satisfied users who trust SafeTrust for their
            secure transactions and escrow needs.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 md:mb-16"
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={subtitleVariants}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              10K+
            </div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              4.9
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              $50M+
            </div>
            <div className="text-sm text-muted-foreground">
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
