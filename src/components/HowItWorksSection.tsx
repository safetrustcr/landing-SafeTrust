"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, inView, hover, scroll, spring } from "motion";

// ─── Step data ────────────────────────────────────────────────────────────────

type StepStatus = "working" | "pendingRelease" | "released";

interface Step {
  id: number;
  stepLabel: string;
  title: string;
  description: string;
  status: StepStatus;
  icon: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    stepLabel: "STEP 1",
    title: "Book & Deposit",
    description: "Funds are locked into the smart-contract escrow on booking.",
    status: "working",
    icon: "🔒",
  },
  {
    id: 2,
    stepLabel: "STEP 2",
    title: "Stay in Progress",
    description:
      "Funds are held on-chain securely while the stay is active.",
    status: "working",
    icon: "⚙️",
  },
  {
    id: 3,
    stepLabel: "STEP 3",
    title: "Check-out & Review",
    description:
      "Both parties confirm checkout to trigger the release.",
    status: "pendingRelease",
    icon: "🤝",
  },
  {
    id: 4,
    stepLabel: "STEP 4",
    title: "Funds Released",
    description:
      "Smart contract releases funds to the host automatically.",
    status: "released",
    icon: "💎",
  },
];

// ─── Status chip config ───────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  StepStatus,
  { label: string; bg: string; text: string; pulse: string; ring: string }
> = {
  working: {
    label: "working",
    bg: "rgba(219,234,254,1)",
    text: "#1d4ed8",
    pulse: "rgba(59,130,246,0.45)",
    ring: "#3b82f6",
  },
  pendingRelease: {
    label: "pendingRelease",
    bg: "rgba(254,243,199,1)",
    text: "#b45309",
    pulse: "rgba(245,158,11,0.45)",
    ring: "#f59e0b",
  },
  released: {
    label: "released",
    bg: "rgba(209,250,229,1)",
    text: "#065f46",
    pulse: "rgba(16,185,129,0.45)",
    ring: "#10b981",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cleanupRefs = useRef<Array<() => void>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const progressBar = progressBarRef.current;
    if (!section || !progressBar) return;

    // Pre-set initial states
    const nodes = Array.from(
      section.querySelectorAll<HTMLElement>(".step-node")
    );
    const connectors = Array.from(
      section.querySelectorAll<HTMLElement>(".h-connector")
    );
    const header = section.querySelector<HTMLElement>(".section-header");
    const chips = Array.from(
      section.querySelectorAll<HTMLElement>(".status-chip")
    );

    // Reset to invisible before animation
    nodes.forEach((n) => {
      n.style.opacity = "0";
      n.style.transform = "translateY(24px)";
    });
    connectors.forEach((c) => {
      const isVertical = c.classList.contains("v-connector");
      c.style.transform = isVertical ? "scaleY(0)" : "scaleX(0)";
      c.style.transformOrigin = isVertical ? "top center" : "left center";
    });
    if (header) {
      header.style.opacity = "0";
      header.style.transform = "translateY(-12px)";
    }

    // ── 5. Scroll-driven progress bar ──────────────────────────────────────
    progressBar.style.transformOrigin = "left center";
    const cancelScroll = scroll(
      animate(
        progressBar,
        { scaleX: [0, 1] },
        { ease: "linear" }
      ),
      {
        target: section,
        offset: ["start end", "end start"],
      }
    );
    cleanupRefs.current.push(cancelScroll);

    // ── Main inView trigger ─────────────────────────────────────────────────
    const stopInView = inView(
      section,
      () => {
        const STEP_DUR = 0.5;
        const STEP_STAGGER = 0.35;
        const CONNECTOR_DUR = 0.45;

        // ── 1. Header fade in ────────────────────────────────────────────────
        if (header) {
          animate(
            header as any,
            { opacity: [0, 1], transform: ["translateY(-12px)", "translateY(0px)"] },
            { duration: 0.5, ease: "ease-out" } as any
          );
        }

        // ── 2. Staggered sequential node reveal ──────────────────────────────
        animate(
          nodes as any,
          { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
          {
            delay: (i: number) => 0.25 + i * STEP_STAGGER,
            duration: STEP_DUR,
            ease: "ease-out",
          } as any
        );

        // ── 3. Connector drawing — fires after each preceding node ───────────
        connectors.forEach((connector, i) => {
          const isVertical = connector.classList.contains("v-connector");
          const startAt = 0.25 + (i + 1) * STEP_STAGGER;
          
          animate(
            connector as any,
            { transform: isVertical ? ["scaleY(0)", "scaleY(1)"] : ["scaleX(0)", "scaleX(1)"] },
            {
              delay: startAt,
              duration: CONNECTOR_DUR,
              ease: "ease-in-out",
            } as any
          );

          const glow = connector.querySelector<HTMLElement>(".connector-glow");
          if (glow) {
            animate(
              glow as any,
              { 
                opacity: [0, 0.8, 0], 
                transform: isVertical 
                  ? ["translateY(-100%)", "translateY(100%)"] 
                  : ["translateX(-100%)", "translateX(100%)"] 
              },
              {
                delay: startAt,
                duration: CONNECTOR_DUR,
                ease: "ease-in-out",
              } as any
            );
          }
        });

        // ── 4. Status chip pulse — looping ──────────────────────────────────
        const chipDelay = 0.25 + STEPS.length * STEP_STAGGER;
        chips.forEach((chip) => {
          const status = chip.dataset.status as StepStatus;
          const cfg = STATUS_CONFIG[status];
          const timer = setTimeout(() => {
            const a = animate(
              chip as any,
              {
                boxShadow: [
                  `0 0 0 0px ${cfg.pulse}`,
                  `0 0 0 6px ${cfg.pulse}`,
                  `0 0 0 0px ${cfg.pulse}`,
                ],
              },
              {
                duration: 1.8,
                repeat: Infinity,
                ease: "ease-in-out",
              } as any
            );
            cleanupRefs.current.push(() => a.stop());
          }, chipDelay * 1000);
          
          cleanupRefs.current.push(() => clearTimeout(timer));
        });

        // ── 5. Hover micro-interactions ──────────────────────────────────────
        nodes.forEach((node) => {
          const circle = node.querySelector<HTMLElement>(".node-circle");
          const icon = node.querySelector<HTMLElement>(".node-icon");

          if (!circle) return;

          const cancelHover = hover(node, () => {
            animate(
              circle,
              { scale: 1.08 },
              { type: spring, stiffness: 300, damping: 15 }
            );
            if (icon) {
              animate(
                icon,
                { rotate: 6 },
                { type: spring, stiffness: 300, damping: 15 }
              );
            }
            return () => {
              animate(
                circle,
                { scale: 1 },
                { type: spring, stiffness: 300, damping: 20 }
              );
              if (icon) {
                animate(
                  icon,
                  { rotate: 0 },
                  { type: spring, stiffness: 300, damping: 20 }
                );
              }
            };
          });
          cleanupRefs.current.push(cancelHover);
        });
      },
      { amount: 0.25, once: true }
    );

    cleanupRefs.current.push(stopInView);

    return () => {
      cleanupRefs.current.forEach((fn) => fn());
      cleanupRefs.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works-section"
      className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 px-4"
    >
      {/* ── Scroll-driven progress bar ── */}
      <div
        ref={progressBarRef}
        className="absolute top-0 left-0 h-[3px] w-full origin-left"
        style={{ backgroundColor: "#2857B8", transformOrigin: "left center" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">
        {/* ── Section Header ── */}
        <div className="section-header mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It{" "}
            <span style={{ color: "#2857B8" }} className="dark:text-blue-400">
              Works
            </span>
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Follow the escrow lifecycle — from booking to funds release —
            secured by blockchain at every step.
          </p>
        </div>

        {/* ── Desktop Timeline ── */}
        <div className="hidden md:flex items-start justify-center gap-0">
          {STEPS.map((step, index) => {
            const cfg = STATUS_CONFIG[step.status];
            return (
              <div key={step.id} className="flex items-center">
                {/* Step Node */}
                <div
                  className="step-node flex flex-col items-center text-center"
                  style={{ width: 160 }}
                >
                  {/* Step label */}
                  <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
                    {step.stepLabel}
                  </p>

                  {/* Circle */}
                  <div
                    className="node-circle relative flex items-center justify-center rounded-full border-2 mb-3"
                    style={{
                      width: 72,
                      height: 72,
                      borderColor: "#2857B8",
                      backgroundColor: "rgba(40,87,184,0.06)",
                    }}
                  >
                    <span
                      className="node-icon text-3xl select-none"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Status chip */}
                  <span
                    className="status-chip mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold"
                    data-status={step.status}
                    style={{
                      backgroundColor: cfg.bg,
                      color: cfg.text,
                      border: `1px solid ${cfg.ring}`,
                    }}
                  >
                    {cfg.label}
                  </span>

                  {/* Title */}
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </p>

                  {/* Description */}
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400 max-w-[130px]">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow (not after last step) */}
                {index < STEPS.length - 1 && (
                  <div
                    className="h-connector relative flex items-center mx-1"
                    style={{
                      width: 48,
                      height: 2,
                      backgroundColor: "#d1d5db",
                      flexShrink: 0,
                      transformOrigin: "left center",
                      marginTop: -60, // align with circle centers
                    }}
                  >
                    {/* Glow overlay */}
                    <div
                      className="connector-glow absolute inset-0 rounded-full opacity-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #2857B8, transparent)",
                      }}
                    />
                    {/* Arrow head */}
                    <svg
                      className="absolute -right-3 top-1/2 -translate-y-1/2"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Mobile Timeline ── */}
        <div className="flex flex-col items-center gap-0 md:hidden">
          {STEPS.map((step, index) => {
            const cfg = STATUS_CONFIG[step.status];
            return (
              <div key={step.id} className="flex flex-col items-center w-full">
                {/* Step Node */}
                <div className="step-node flex items-center gap-4 w-full max-w-sm px-2">
                  {/* Circle */}
                  <div
                    className="node-circle flex-shrink-0 flex items-center justify-center rounded-full border-2"
                    style={{
                      width: 60,
                      height: 60,
                      borderColor: "#2857B8",
                      backgroundColor: "rgba(40,87,184,0.06)",
                    }}
                  >
                    <span className="node-icon text-2xl" aria-hidden="true">
                      {step.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">
                      {step.stepLabel}
                    </span>
                    <span
                      className="status-chip mb-1 self-start rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      data-status={step.status}
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.text,
                        border: `1px solid ${cfg.ring}`,
                      }}
                    >
                      {cfg.label}
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </p>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Vertical connector */}
                {index < STEPS.length - 1 && (
                  <div
                    className="h-connector v-connector relative my-2"
                    style={{
                      width: 2,
                      height: 36,
                      backgroundColor: "#d1d5db",
                      transformOrigin: "top center",
                    }}
                  >
                    <div
                      className="connector-glow absolute inset-0 rounded-full opacity-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, #2857B8, transparent)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            Ready to secure your transactions?
          </p>
          <a
            href="/register"
            id="how-it-works-cta"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: "#2857B8" }}
          >
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}