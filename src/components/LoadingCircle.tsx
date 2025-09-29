import React from "react";

interface Props {
  size?: string; 
  color?: string; 
  className?: string;
}

const LoadingCircle: React.FC<Props> = ({
  size = "w-12 h-12",
  color = "border-blue-500",
  className,
}) => {
  const isTailwindColor = color.startsWith("border-");

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

      {/* Main spinning loader using props */}
      <div
        className={`${size} border-4 rounded-full animate-spin ${
          isTailwindColor ? color : ""
        } border-t-transparent`}
        style={!isTailwindColor ? { borderColor: color, borderTopColor: "transparent" } : {}}
      ></div>
    </div>
  );
};

export default LoadingCircle;
