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

    // Top progress bar linked to section scroll
    let cancelScroll = () => {};
    if (progressBar) {
      cancelScroll = scroll(
        animate(progressBar, { scaleX: [0, 1] }, { ease: "linear" }),
        { target: section, offset: ["start end", "end start"] }
      );
    }

    let hasAnimated = false;

    const stopInView = inView(
      section,
      () => {
        if (hasAnimated) return;
        hasAnimated = true;

        // 1. Header reveal
        if (header) {
          animate(
            header,
            { opacity: [0, 1], transform: ["translateY(-14px)", "translateY(0px)"] },
            { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          );
        }

        const isMobile = window.innerWidth <= 768;
        const STEP_STAGGER = 0.55;

        // 2. Sequential progression through the 4 steps
        nodes.forEach((node, idx) => {
          const startTime = 0.2 + idx * STEP_STAGGER;
          const circle = node.querySelector("[data-node-circle]");
          const checkmark = node.querySelector("[data-checkmark]");
          const status = circle?.getAttribute("data-status");

          // Step node fade and translate in
          animate(
            node,
            {
              opacity: [0, 1],
              transform: isMobile
                ? ["translateX(-16px)", "translateX(0px)"]
                : ["translateY(24px)", "translateY(0px)"],
            },
            {
              delay: startTime,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }
          );

          // Step circle pop-in state transition
          if (circle) {
            animate(
              circle,
              {
                transform: ["scale(0.65)", "scale(1.12)", "scale(1)"],
                opacity: [0, 1, 1],
              },
              {
                delay: startTime + 0.08,
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1],
              }
            );
          }

          // Checkmark draw-in for completed steps
          if (checkmark && status === "completed") {
            animate(
              checkmark,
              {
                strokeDashoffset: [28, 0],
                opacity: [0, 1],
              },
              {
                delay: startTime + 0.22,
                duration: 0.4,
                ease: "easeOut",
              }
            );
          }

          // Connector progress fill from step to step
          if (idx < connectors.length) {
            const connector = connectors[idx];
            const fill = connector.querySelector("[data-connector-fill]");
            const glow = connector.querySelector("[data-connector-glow]");
            const nextNode = nodes[idx + 1];
            const nextStatus = nextNode?.querySelector("[data-node-circle]")?.getAttribute("data-status");

            // Fill connector if current step is completed (steps 1->2 and steps 2->3 towards active in-progress step)
            if (status === "completed" && (nextStatus === "completed" || nextStatus === "in-progress")) {
              const connectorStart = startTime + 0.32;
              const fillTransform = isMobile ? { scaleY: [0, 1] } : { scaleX: [0, 1] };

              if (fill) {
                animate(fill, fillTransform, {
                  delay: connectorStart,
                  duration: 0.45,
                  ease: [0.4, 0, 0.2, 1],
                });
              }

              if (glow) {
                const glowTransform = isMobile
                  ? { transform: ["translateY(-100%)", "translateY(100%)"] }
                  : { transform: ["translateX(-100%)", "translateX(100%)"] };

                animate(
                  glow,
                  {
                    opacity: [0, 0.85, 0],
                    ...glowTransform,
                  },
                  {
                    delay: connectorStart,
                    duration: 0.45,
                    ease: "easeInOut",
                  }
                );
              }
            }
          }
        });

        // 3. Hover micro-animations
        nodes.forEach((node) => {
          const circle = node.querySelector("[data-node-circle]");
          const icon = node.querySelector("[data-node-icon]");
          if (!circle) return;

          hover(node, () => {
            animate(circle, { scale: 1.08 }, { type: spring, stiffness: 320, damping: 18 });
            if (icon) animate(icon, { rotate: 6 }, { type: spring, stiffness: 320, damping: 18 });
            return () => {
              animate(circle, { scale: 1 }, { type: spring, stiffness: 320, damping: 20 });
              if (icon) animate(icon, { rotate: 0 }, { type: spring, stiffness: 320, damping: 20 });
            };
          });
        });
      },
      { amount: 0.2 }
    );

    return () => {
      cancelScroll();
      stopInView();
    };
  }, []);

  return null;
}