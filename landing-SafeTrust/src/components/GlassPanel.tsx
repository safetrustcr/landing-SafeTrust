import type { ReactNode } from "react";
import GlassSurface from "./GlassSurface/GlassSurface.jsx";

interface GlassPanelProps {
  children?: ReactNode;
  className?: string;
}

/** Large refractive glass panel (GlassSurface) used by the Final CTA section. */
export default function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <GlassSurface
      className={className}
      width="100%"
      height="auto"
      borderRadius={30}
      borderWidth={0.07}
      brightness={50}
      opacity={0.93}
      blur={11}
      displace={0.5}
      backgroundOpacity={0.1}
      saturation={1.2}
      distortionScale={-180}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
    >
      {children}
    </GlassSurface>
  );
}
