// src/components/HowItWorks/Stepper.jsx
import { useEffect } from "react";
import { animate, inView, hover, scroll, spring } from "motion";

export default function Stepper() {
  useEffect(() => {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const progressBar = section.querySelector("[data-progress-bar]");
    const nodes = Array.from(section.querySelectorAll("[data-step-node]"));
    const connectors = Array.from(section.querySelectorAll("[data-connector]"));
    const header = section.querySelector("[data-header]");
    const chips = Array.from(section.querySelectorAll("[data-status-chip]"));

    const cancelScroll = scroll(
      animate(progressBar, { scaleX: [0, 1] }, { ease: "linear" }),
      { target: section, offset: ["start end", "end start"] }
    );

    const stopInView = inView(section, () => {
      const STEP_STAGGER = 0.35;

      animate(header, { opacity: [0, 1], transform: ["translateY(-12px)", "translateY(0px)"] }, { duration: 0.5 });

      animate(nodes, { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] }, {
        delay: (i) => 0.25 + i * STEP_STAGGER,
        duration: 0.5,
      });

      connectors.forEach((connector, i) => {
        const isVertical = connector.classList.contains("v-connector");
        const startAt = 0.25 + (i + 1) * STEP_STAGGER;
        animate(connector, { transform: isVertical ? ["scaleY(0)", "scaleY(1)"] : ["scaleX(0)", "scaleX(1)"] }, { delay: startAt, duration: 0.45 });

        const glow = connector.querySelector("[data-connector-glow]");
        if (glow) {
          animate(glow, {
            opacity: [0, 0.8, 0],
            transform: isVertical ? ["translateY(-100%)", "translateY(100%)"] : ["translateX(-100%)", "translateX(100%)"],
          }, { delay: startAt, duration: 0.45 });
        }
      });

      nodes.forEach((node) => {
        const circle = node.querySelector(".node-circle");
        const icon = node.querySelector(".node-icon");
        if (!circle) return;
        hover(node, () => {
          animate(circle, { scale: 1.08 }, { type: spring, stiffness: 300, damping: 15 });
          if (icon) animate(icon, { rotate: 6 }, { type: spring, stiffness: 300, damping: 15 });
          return () => {
            animate(circle, { scale: 1 }, { type: spring, stiffness: 300, damping: 20 });
            if (icon) animate(icon, { rotate: 0 }, { type: spring, stiffness: 300, damping: 20 });
          };
        });
      });
    }, { amount: 0.25 });

    return () => {
      cancelScroll();
      stopInView();
    };
  }, []);

  return null;
}