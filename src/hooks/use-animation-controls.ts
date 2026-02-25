import {
  useAnimation,
  useReducedMotion,
  AnimationControls,
} from "framer-motion";
import { useCallback, useEffect } from "react";

interface AnimationControlConfig {
  /** Should the animation play automatically when the component mounts? */
  autoPlay?: boolean;
}

interface UseAnimationControlsReturn {
  controls: AnimationControls;
  play: (definition: any) => Promise<any> | void;
  stop: () => void;
  shouldReduceMotion: boolean | null;
}

/**
 * A custom hook to manage framer-motion animations with built-in
 * accessibility (reduced motion) support.
 */
export function useAnimationControls({
  autoPlay = false,
}: AnimationControlConfig = {}): UseAnimationControlsReturn {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  const play = useCallback(
    async (definition: any) => {
      // If the user prefers reduced motion, we should ideally still set the final state
      // but without the transition. In many framer-motion setups, just skipping the animation
      // or applying it instantly is preferred. For this basic hook, we pass it through
      // and rely on the components to adjust their `transition` based on `shouldReduceMotion`.
      return controls.start(definition);
    },
    [controls],
  );

  const stop = useCallback(() => {
    controls.stop();
  }, [controls]);

  useEffect(() => {
    if (autoPlay) {
      // This would require a default animation definition to be useful automatically,
      // but provided here as a skeleton for extensions.
    }
  }, [autoPlay]);

  return {
    controls,
    play,
    stop,
    shouldReduceMotion,
  };
}
