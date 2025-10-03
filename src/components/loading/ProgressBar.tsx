"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value?: number; // 0–100
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className }) => {
  const isIndeterminate = value === undefined;

  return (
    <div
      className={cn("w-full h-2 bg-muted rounded overflow-hidden", className)}
    >
      <div
        className={cn(
          "h-full bg-primary transition-all duration-300",
          isIndeterminate && "animate-[progress_1.5s_ease-in-out_infinite]"
        )}
        style={{
          width: isIndeterminate ? "40%" : `${value}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
