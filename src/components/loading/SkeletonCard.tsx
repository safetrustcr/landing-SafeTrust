"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-48 rounded-xl bg-muted animate-pulse flex flex-col gap-3 p-4",
        className
      )}
    >
      <div className="h-6 w-2/3 bg-muted-foreground/30 rounded"></div>
      <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
      <div className="h-4 w-3/4 bg-muted-foreground/20 rounded"></div>
      <div className="h-32 w-full bg-muted-foreground/10 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
