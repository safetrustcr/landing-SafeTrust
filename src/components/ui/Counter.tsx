"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

export interface CounterProps {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    separator?: boolean;
    useIntersectionObserver?: boolean;
    threshold?: number;
}


export const Counter: React.FC<CounterProps> = ({
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    prefix = "",
    suffix = "",
    className,
    separator = true,
    useIntersectionObserver = true,
    threshold = 0.5,
}) => {
    const { value, ref } = useCounterAnimation({
        start,
        end,
        duration,
        decimals,
        useIntersectionObserver,
        threshold,
    });

    // Format number with separators (e.g., 10,000)
    const formatNumber = (num: number): string => {
        if (!separator) return num.toString();

        const parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    return (
        <motion.span
            ref={ref as React.RefObject<HTMLSpanElement>}
            className={cn(
                "inline-block  font-bold  bg-clip-text text-primary",
                className
            )}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            aria-live="polite"
            aria-atomic="true"
        >
            {prefix}
            {formatNumber(value)}
            {suffix}
        </motion.span>
    );
};

export default Counter;
