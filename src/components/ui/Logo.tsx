"use client";

import * as React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils"; // If cn is not available, Tailwind classes will still work without it.
import { LogoProps, logoSizePx } from "@/types/logo";

/**
 * SVG-based SafeTrust logo.
 * - Uses currentColor so it adapts to dark/light via text color
 * - size prop maps to pixel dimensions
 * - animated prop enables subtle hover/press transitions
 */
export function Logo({ size = "md", animated = false, className, "aria-label": ariaLabel }: LogoProps) {
  const id = useId();
  const px = logoSizePx[size] ?? logoSizePx.md;

  const hoverClasses = animated
    ? "transition-transform duration-300 will-change-transform hover:scale-[1.03] active:scale-95"
    : "";

  return (
    <svg
      role="img"
      aria-label={ariaLabel ?? "SafeTrust"}
      width={px}
      height={px}
      viewBox="0 0 64 64"
      className={cn(
        // Default color follows text color; tweak here as desired
        "text-foreground",
        hoverClasses,
        className
      )}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{ariaLabel ?? "SafeTrust"}</title>

      {/* Outer rounded square mark */}
      <rect x="6" y="6" width="52" height="52" rx="14" stroke="currentColor" strokeWidth="3" opacity="0.9" />

      {/* Subtle gradient highlight (masked) */}
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="14" fill={`url(#g-${id})`} opacity="0.25" />

      {/* Stylized "S" monogram (stroke only for crispness) */}
      <path
        d="M45 19c-5-3-16-3-20 2-4 5 2 9 9 10 7 1 11 4 9 9-2 5-12 6-19 2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Logo;
