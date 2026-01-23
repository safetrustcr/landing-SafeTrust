import { useState, useCallback, useRef, useEffect } from "react";

interface HoverAnimationReturn {
  isHovered: boolean;
  isTouched: boolean;
  transform: string;
  handleMouseEnter: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
  handleTouch: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function useHoverAnimation(): HoverAnimationReturn {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [transform, setTransform] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  }, [isTouchDevice]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isHovered || isTouchDevice || !cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation based on mouse position
      // Max rotation: 5 degrees
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 2;

      setTransform(
        `translateY(-8px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(0)`,
      );
    },
    [isHovered, isTouchDevice],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("");
  }, []);

  const handleTouch = useCallback(() => {
    if (isTouchDevice) {
      setIsTouched((prev) => !prev);
    }
  }, [isTouchDevice]);

  // Reset touch state when clicking outside
  useEffect(() => {
    if (!isTouched) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsTouched(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isTouched]);

  return {
    isHovered,
    isTouched,
    transform,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    handleTouch,
    cardRef,
  };
}
