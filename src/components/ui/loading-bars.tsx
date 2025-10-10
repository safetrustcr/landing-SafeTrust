"use client";
import React from "react";
import type { SpinnerSize } from "./Spinner";

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-1 h-4",
  md: "w-2 h-6",
  lg: "w-3 h-8",
};

interface Props {
  size: SpinnerSize;
  color: string;
  "aria-label"?: string;
}

export default function LoadingBars({
  size,
  color,
  "aria-label": ariaLabel = "Loading...",
}: Props) {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className="flex space-x-1 items-end"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${sizeMap[size]} ${color} bg-current animate-[grow_1s_ease-in-out_infinite]`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}

      <style jsx>{`
        @keyframes grow {
          0%,
          80%,
          100% {
            transform: scaleY(0.4);
          }
          40% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
