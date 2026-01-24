"use client";
import React from "react";
import type { SpinnerSize } from "./spinner";

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

interface Props {
  size: SpinnerSize;
  color: string;
  "aria-label"?: string;
}

export default function LoadingDots({
  size,
  color,
  "aria-label": ariaLabel = "Loading...",
}: Props) {
  return (
    <div role="status" aria-label={ariaLabel} className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${sizeMap[size]} ${color} rounded-full bg-current animate-bounce`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
