import type { ReactNode } from "react";
import { GlassCard } from "react-glass-ui";

interface GlassPanelProps {
  children?: ReactNode;
  className?: string;
  /** Stable id: keeps the SVG filter id identical between SSR and hydration. */
  id: string;
}

/** Liquid-glass wrapper (react-glass-ui) used by the Final CTA section. */
export default function GlassPanel({ children, className, id }: GlassPanelProps) {
  return (
    <GlassCard
      id={id}
      className={className}
      contentClassName="glass-panel-content"
      padding="0"
      blur={4}
      distortion={40}
      flexibility={0}
      borderColor="#ffffff"
      borderSize={1}
      borderRadius={30}
      borderOpacity={0.4}
      backgroundColor="#000000"
      backgroundOpacity={0.2}
      innerLightColor="#ffffff"
      innerLightSpread={1}
      innerLightBlur={10}
      innerLightOpacity={0}
      outerLightColor="#ffffff"
      outerLightSpread={1}
      outerLightBlur={10}
      outerLightOpacity={0}
      color="#ffffff"
      chromaticAberration={0}
      onHoverScale={1}
      saturation={100}
      brightness={100}
    >
      {children}
    </GlassCard>
  );
}
