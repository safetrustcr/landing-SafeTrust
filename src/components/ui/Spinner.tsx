'use client'

import React from "react"
import LoadingDots from "../LoadingDots";
import LoadingBar from "../LoadingBar";
import LoadingCircle from "../LoadingCircle"; 
import LoadingPulse from "../LoadingPulse";


export type Spinnervariant = "dots"| "bars"|"circle" | "pulse"
export type SpinnerSize = "sm"| "md" | "lg"

interface SpinnerProps{
  variant?:Spinnervariant,
  size?:SpinnerSize,
  color?:string,
  className?:string
}


const Spinner:React.FC<SpinnerProps> =({
  variant = "circle",
  size="md",
  color="#000",
  className=""
})=>{
  const sizeMapDots = {
    sm:"w-4 h-4",
    md:"w-6 h-6",
    lg:"w-10 h-10"
  }
  const sizeMapBar = {
    sm:"w-28 h-2",
    md:"w-36 h-3",
    lg:"w-44 h-4"
  }
  const sizeMapCircle = {
    sm:"w-14 h-14",
    md:"w-16 h-16",
    lg:"w-20 h-20"
  }
  const sizeMapPulse = {
    sm:"w-14 h-14",
    md:"w-16 h-16",
    lg:"w-20 h-20"
  }

  const commonPropsDots = {size:sizeMapDots[size],color,className}
  const commonPropsBar = {size:sizeMapBar[size],color,className}
  const commonPropsCircle = {size:sizeMapCircle[size],color,className}
  const commonPropsPulse = {size:sizeMapPulse[size],color,className}

  switch (variant){
    case "dots":
      return <LoadingDots {...commonPropsDots} />
    
    case "bars":
      return <LoadingBar {...commonPropsBar} />;
    case "pulse":
      return <LoadingPulse {...commonPropsPulse} />;

    default:
      return <LoadingCircle {...commonPropsCircle} />;
  }
}

export default Spinner;