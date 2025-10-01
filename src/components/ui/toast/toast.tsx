"use client";

import React, { useEffect, useRef, useState } from "react";
import { Toast as ToastType } from "../../../types/toast";

const typeToAccent: Record<string, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-400",
  info: "bg-blue-500",
};

export default function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastType;
  onDismiss: () => void;
}) {
  const { title, description, type, duration = 3000 } = toast;
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = window.setTimeout(() => {
        setLeaving(true);
      }, duration);

      const start = Date.now();
      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.max(100 - (elapsed / duration) * 100, 0);
        setProgress(percent);
      }, 50);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [duration]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => onDismiss(), 300);
    return () => clearTimeout(t);
  }, [leaving, onDismiss]);

  return (
    <div
      className={`pointer-events-auto max-w-md w-full rounded-lg shadow-lg bg-white px-4 py-3 transform transition-all duration-300 ease-out flex flex-col gap-2
      ${
        leaving
          ? "opacity-0 translate-y-2 scale-95"
          : "opacity-100 translate-y-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && <div className="font-semibold text-sm">{title}</div>}
          {description && (
            <div className="text-xs mt-1 text-gray-700">{description}</div>
          )}
        </div>
        <button
          aria-label="Dismiss toast"
          onClick={() => setLeaving(true)}
          className="text-sm p-1 rounded hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {duration ? (
        <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
          <div
            className={`h-full ${typeToAccent[type] || "bg-gray-400"}`}
            style={{
              width: `${progress}%`,
              transition: "width 50ms linear",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
