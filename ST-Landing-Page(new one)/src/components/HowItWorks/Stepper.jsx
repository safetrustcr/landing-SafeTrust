// src/components/HowItWorks/Stepper.jsx
import { useEffect } from "react";

export default function Stepper() {
  useEffect(() => {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return null;
}