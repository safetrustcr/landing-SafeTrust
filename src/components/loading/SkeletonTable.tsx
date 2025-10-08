"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-md border border-border overflow-hidden",
        className
      )}
    >
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 px-4 py-3 animate-pulse"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-4 bg-muted-foreground/20 rounded"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
