import React from "react";

interface Props {
  size?: string; 
  color?: string; 
  className?: string;
}

const LoadingDots: React.FC<Props> = ({
  size = "w-3 h-3",
  color = "bg-blue-500",
  className,
}) => {
  const isTailwindColor = color.startsWith("bg-");

  const dotStyle = (delay: string) =>
    isTailwindColor
      ? { animationDelay: delay }
      : { backgroundColor: color, animationDelay: delay };

  return (
    <div
      className={`w-screen h-screen bg-[#0a0a15] flex items-center justify-center relative overflow-hidden ${
        className || ""
      }`}
    >
      {/* Background glow effects for ambient lighting */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-600 opacity-10 blur-xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-12 w-20 h-20 bg-indigo-500 opacity-10 blur-xl rounded-full animate-pulse"></div>

      {/* Floating particle effects scattered across the background */}
      <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-1/4 left-1/3 animate-float-slow"></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full top-2/3 left-1/2 animate-float"></div>
      <div className="absolute w-1 h-1 bg-indigo-400 rounded-full top-1/2 left-2/3 animate-float-fast"></div>
      <div className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full top-1/3 left-2/5 animate-float"></div>

      {/* Bouncing dots loader using props */}
      <div className="flex space-x-2">
        {["0s", "0.15s", "0.3s", "0.45s", "0.6s"].map((delay, i) => (
          <span
            key={i}
            className={`${size} rounded-full animate-bounce ${
              isTailwindColor ? color : ""
            }`}
            style={dotStyle(delay)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default LoadingDots;
