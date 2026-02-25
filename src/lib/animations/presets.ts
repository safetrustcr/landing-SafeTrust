import { TargetAndTransition, Variant } from "framer-motion";

export type AnimationPresetName =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "pop";

export const animationPresets: Record<AnimationPresetName, Variant> = {
  fadeIn: {
    opacity: [0, 1],
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideUp: {
    y: [20, 0],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideDown: {
    y: [-20, 0],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideLeft: {
    x: [20, 0],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideRight: {
    x: [-20, 0],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  scale: {
    scale: [0.95, 1],
    opacity: [0, 1],
    transition: { duration: 0.3, ease: "easeOut" },
  },
  pop: {
    scale: [0.8, 1.05, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, times: [0, 0.6, 1], ease: "easeOut" },
  },
};
