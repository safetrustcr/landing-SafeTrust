import React, { useEffect, useRef, useState } from "react";
import { Toast as ToastType } from "../../../types/toast";

const typeToAccent: Record<string, string> = {
  success: "border-green-400",
  error: "border-red-400",
  warning: "border-yellow-400",
  info: "border-blue-400",
};

export default function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastType;
  onDismiss: () => void;
}) {
  const { id, title, description, type, duration = 5000 } = toast;
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (duration && duration > 0) {
      timerRef.current = window.setTimeout(() => {
        setLeaving(true);
      }, duration);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [duration]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => onDismiss(), 300);
    return () => clearTimeout(t);
  }, [leaving, onDismiss]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    if (!duration || duration <= 0) return;

    timerRef.current = window.setTimeout(() => setLeaving(true), 2000);
  };

  return (
    <div
      className={`pointer-events-auto max-w-md w-full rounded-lg shadow-lg border-l-4 bg-white/95 px-4 py-3 transform transition-all duration-300 ease-out flex items-start gap-3 ${
        leaving
          ? "opacity-0 translate-y-2 scale-98"
          : "opacity-100 translate-y-0"
      } ${typeToAccent[type] || "border-gray-300"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
    >
      <div className="flex-1">
        {title && <div className="font-semibold text-sm">{title}</div>}
        {description && (
          <div className="text-xs mt-1 text-gray-700">{description}</div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {duration ? (
          <div className="w-16 h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-current" />
          </div>
        ) : null}
        <button
          aria-label="Dismiss toast"
          onClick={() => setLeaving(true)}
          className="text-sm p-1 rounded hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
