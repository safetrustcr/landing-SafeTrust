import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-6 shadow-md border border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
