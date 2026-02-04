"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";
import styles from "@/styles/testimonials.module.css";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "w-4 h-4 transition-colors duration-200",
          star <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
        )}
        aria-hidden="true"
      />
    ))}
  </div>
);

const Avatar = ({
  src,
  name,
  isActive,
}: {
  src: string;
  name: string;
  isActive?: boolean;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0",
        "bg-gradient-to-br from-primary/20 to-primary/40",
        "ring-2 ring-offset-2 ring-offset-background transition-all duration-300",
        isActive ? "ring-primary" : "ring-border"
      )}
    >
      {!imageError ? (
        <Image
          src={src}
          alt={`${name}'s profile picture`}
          width={56}
          height={56}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-semibold text-lg">
          {initials}
        </div>
      )}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isActive = false,
}) => {
  const { name, role, company, avatar, quote, rating, date } = testimonial;

  return (
    <motion.div
      className={cn(
        styles.testimonialCard,
        "relative flex flex-col h-full p-6 rounded-2xl",
        "bg-card border border-border",
        "transition-all duration-300",
        isActive
          ? "shadow-xl shadow-primary/10 scale-100"
          : "shadow-md scale-95 opacity-80"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.8, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Decorative quotation mark */}
      <div
        className={cn(
          styles.quoteDecoration,
          "absolute top-4 left-4 text-6xl font-serif leading-none",
          "text-primary/20 select-none pointer-events-none"
        )}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote content */}
      <blockquote className="relative z-10 flex-1 pt-8 pb-4">
        <p className="text-foreground text-base md:text-lg leading-relaxed">
          {quote}
        </p>
      </blockquote>

      {/* Closing quotation mark */}
      <div
        className={cn(
          styles.quoteDecoration,
          "absolute bottom-16 right-4 text-6xl font-serif leading-none",
          "text-primary/20 select-none pointer-events-none rotate-180"
        )}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* User info section */}
      <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-border">
        <Avatar src={avatar} name={name} isActive={isActive} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-foreground truncate">{name}</h4>
            <StarRating rating={rating} />
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {role}
            {company && (
              <span className="hidden sm:inline"> at {company}</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
