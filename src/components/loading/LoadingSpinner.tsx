"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  className,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center"
    >
      <Loader2
        className={`animate-spin text-primary ${className ?? ""}`}
        size={size}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
