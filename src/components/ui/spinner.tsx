"use client";
import React from "react";
import LoadingDots from "./loading-dots";
import LoadingBars from "./loading-bars";

export type SpinnerVariant = "dots" | "bars" | "circle" | "pulse";
export type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  className?: string;
  "aria-label"?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function Spinner({
  variant = "circle",
  size = "md",
  color = "text-blue-500",
  className = "",
  "aria-label": ariaLabel = "Loading...",
}: SpinnerProps) {
  if (variant === "dots") {
    return <LoadingDots size={size} color={color} aria-label={ariaLabel} />;
  }

  if (variant === "bars") {
    return <LoadingBars size={size} color={color} aria-label={ariaLabel} />;
  }

  if (variant === "pulse") {
    return (
      <span
        role="status"
        aria-label={ariaLabel}
        className={`${sizeMap[size]} ${color} animate-pulse rounded-full bg-current ${className}`}
      />
    );
  }

  // Circle fallback
  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      className={`animate-spin ${sizeMap[size]} ${color} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
