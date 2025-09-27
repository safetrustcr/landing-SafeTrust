"use client";

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ children, content, position = 'top', className = '' }: TooltipProps) {
  const [show, setShow] = useState(false);

  let tooltipStyle = 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
  let arrowStyle = 'top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800';

  if (position === 'bottom') {
    tooltipStyle = 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    arrowStyle = 'bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-800';
  } else if (position === 'left') {
    tooltipStyle = 'right-full top-1/2 transform -translate-y-1/2 mr-2';
    arrowStyle = 'left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-800';
  } else if (position === 'right') {
    tooltipStyle = 'left-full top-1/2 transform -translate-y-1/2 ml-2';
    arrowStyle = 'right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-800';
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div 
          className={`absolute ${tooltipStyle} px-3 py-2 bg-slate-800 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap ${className}`}
          style={{ pointerEvents: 'none' }}
        >
          {content}
          <div className={`absolute ${arrowStyle}`}></div>
        </div>
      )}
    </div>
  );
}