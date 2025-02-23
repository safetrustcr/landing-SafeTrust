import * as React from "react";

const typographyVariants = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-medium",
  p: "text-base text-gray-400",
};

interface TypographyProps {
  variant: keyof typeof typographyVariants;
  className?: string;
  children: React.ReactNode;
}

export function Typography({ variant, className = "", children }: TypographyProps) {
  const Component = variant === "p" ? "p" : variant;
  return <Component className={`${typographyVariants[variant]} ${className}`}>{children}</Component>;
}