"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, CheckCircle, DollarSign } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const MAIN_STEPS = [
  {
    emoji: "🔏",
    label: "Book & Deposit",
    status: "working",
    chipClass: "text-[#2857B8] border-[#2857B8]/40 bg-[#2857B8]/5",
    Icon: Lock,
    description: "Funds are locked into the smart-contract escrow on booking.",
  },
  {
    emoji: "⛓️",
    label: "Stay in Progress",
    status: "working",
    chipClass: "text-[#2857B8] border-[#2857B8]/40 bg-[#2857B8]/5",
    Icon: ShieldCheck,
    description: "Funds are held on-chain securely while the stay is active.",
  },
  {
    emoji: "🤝",
    label: "Check-out & Review",
    status: "pendingRelease",
    chipClass: "text-amber-600 border-amber-300 bg-amber-50",
    Icon: CheckCircle,
    description: "Both parties confirm checkout to trigger the release.",
  },
  {
    emoji: "💸",
    label: "Funds Released",
    status: "released",
    chipClass: "text-emerald-600 border-emerald-300 bg-emerald-50",
    Icon: DollarSign,
    description: "Smart contract releases funds to the host automatically.",
  },
];

// All main-path node circles use SafeTrust blue
const NODE = {
  border: "border-[#2857B8]",
  ring: "ring-[#2857B8]/20",
} as const;

// ─── Desktop: step node ────────────────────────────────────────────────────────

function DesktopNode({
  step,
  index,
}: {
  step: (typeof MAIN_STEPS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.13 }}
    >
      <span className="text-[11px] font-semibold text-muted-foreground mb-2 tracking-widest uppercase">
        Step {index + 1}
      </span>

      {/* Circle — always SafeTrust blue */}
      <div
        className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-[2rem]
          bg-white border-2 ${NODE.border} ring-4 ${NODE.ring} shadow-md z-10`}
      >
        <span aria-hidden="true" suppressHydrationWarning>
          {step.emoji}
        </span>
      </div>

      {/* Status chip — color varies per on-chain state */}
      <span
        className={`mt-3 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${step.chipClass}`}
      >
        {step.status}
      </span>

      <h3 className="mt-2 text-sm font-bold text-foreground text-center leading-snug px-1">
        {step.label}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground text-center leading-relaxed max-w-[130px]">
        {step.description}
      </p>
    </motion.div>
  );
}

// ─── Desktop: animated connector ──────────────────────────────────────────────

function HConnector({ index }: { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="flex items-start flex-shrink-0 w-10 pt-[48px]">
      <motion.div
        className="flex items-center w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.13 + 0.2 }}
        style={{ originX: 0 }}
      >
        <div className="flex-1 h-px bg-[#2857B8]/40" />
        <ArrowRight className="w-3 h-3 text-[#2857B8]/50 -ml-1 flex-shrink-0" />
      </motion.div>
    </div>
  );
}

// ─── Mobile: step row ──────────────────────────────────────────────────────────

function MobileStep({
  step,
  index,
  isLast,
}: {
  step: (typeof MAIN_STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="flex gap-4"
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.11 }}
    >
      {/* Left rail: circle + vertical line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-white
            border-2 ${NODE.border} ring-4 ${NODE.ring} shadow-md`}
        >
          <span aria-hidden="true" suppressHydrationWarning>
            {step.emoji}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1 min-h-[2rem] bg-gradient-to-b from-[#2857B8]/40 to-[#2857B8]/10" />
        )}
      </div>

      {/* Content */}
      <div className="pt-0.5 pb-5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Step {index + 1}
        </span>
        <div className="flex flex-wrap items-center gap-2 mt-0.5">
          <h3 className="text-sm font-bold text-foreground">{step.label}</h3>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${step.chipClass}`}
          >
            {step.status}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed max-w-xs">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

const HowItWorksSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="how-it-works"
      className="bg-background py-20 px-6 md:px-16 overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            How It <span className="text-[#2857B8]">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Follow the escrow lifecycle — from booking to funds release —
            secured by blockchain at every step.
          </p>
        </motion.div>

        {/* ── DESKTOP timeline ── */}
        <div className="hidden md:block">
          <div
            className="grid items-start"
            style={{ gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr" }}
          >
            {MAIN_STEPS.map((step, index) => (
              <React.Fragment key={index}>
                <DesktopNode step={step} index={index} />
                {index < MAIN_STEPS.length - 1 && <HConnector index={index} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── MOBILE timeline ── */}
        <div className="md:hidden flex flex-col">
          {MAIN_STEPS.map((step, index) => (
            <MobileStep
              key={index}
              step={step}
              index={index}
              isLast={index === MAIN_STEPS.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.8 }}
        >
          <p className="text-base font-semibold text-foreground mb-4">
            Ready to secure your transactions?
          </p>
          <motion.button
            className="bg-[#2857B8] text-white py-3 px-8 rounded-lg inline-flex items-center gap-2 hover:bg-[#1e45a0] transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;