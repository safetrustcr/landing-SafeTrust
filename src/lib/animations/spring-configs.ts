import { Transition } from "framer-motion";

export type SpringConfigName =
  | "gentle"
  | "wobbly"
  | "stiff"
  | "slow"
  | "bouncy";

export const springConfigs: Record<SpringConfigName, Transition> = {
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  wobbly: {
    type: "spring",
    stiffness: 150,
    damping: 10,
    mass: 1,
  },
  stiff: {
    type: "spring",
    stiffness: 250,
    damping: 25,
    mass: 1,
  },
  slow: {
    type: "spring",
    stiffness: 50,
    damping: 10,
    mass: 1,
  },
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 1.5,
  },
};
