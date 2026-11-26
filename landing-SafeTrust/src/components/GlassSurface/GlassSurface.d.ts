import type { CSSProperties, ReactNode } from "react";

export interface GlassSurfaceProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";
  mixBlendMode?: string;
  refraction?: boolean;
  renderer?: "auto" | "webgl";
  backdrop?: unknown;
  shape?: string;
}

export default function GlassSurface(props: GlassSurfaceProps): ReactNode;
