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
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-sm transition-all duration-300",
        "bg-primary text-white shadow-sm shadow-primary/20",
        isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-[#0b1739]" : "ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
      )}
    >
      {!imageError && src ? (
        <Image
          src={src}
          alt={`${name}'s profile picture`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
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
        "relative flex flex-col h-full p-6 rounded-2xl border transition-all duration-500 ease-in-out",
        isActive
          ? "bg-[#0b1739] text-white border-transparent shadow-xl shadow-primary/10 scale-100 z-10"
          : "bg-card text-foreground border-border shadow-sm scale-95 opacity-60 hover:opacity-100 hover:scale-[0.98]"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative quotation mark */}
      <div
        className={cn(
          "absolute top-4 left-4 text-6xl font-serif leading-none select-none pointer-events-none transition-colors duration-500",
          isActive ? "text-primary" : "text-primary/50"
        )}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote content */}
      <blockquote className="relative z-10 flex-1 pt-8 pb-6">
        <p className={cn(
          "text-base md:text-lg leading-relaxed font-normal transition-colors duration-500",
          isActive ? "text-white" : "text-slate-700 dark:text-slate-300"
        )}>
          {quote}
        </p>
      </blockquote>

      {/* User info section */}
      <div className={cn(
        "relative z-10 flex items-center gap-4 pt-4 border-t transition-colors duration-500 mt-auto",
        isActive ? "border-slate-800" : "border-border"
      )}>
        <Avatar src={avatar} name={name} isActive={isActive} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className={cn(
              "font-semibold truncate transition-colors duration-500",
              isActive ? "text-white" : "text-slate-900 dark:text-slate-100"
            )}>{name}</h4>
            <StarRating rating={rating} />
          </div>
          <p className={cn(
            "text-sm truncate transition-colors duration-500",
            isActive ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
          )}>
            {role}
            {company && (
              <span className="hidden sm:inline"> at {company}</span>
            )}
          </p>
          <p className={cn(
            "text-xs mt-1 transition-colors duration-500",
            isActive ? "text-slate-500" : "text-slate-400 dark:text-slate-500"
          )}>{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
