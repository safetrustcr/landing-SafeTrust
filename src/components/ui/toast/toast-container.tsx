"use client";

import React from "react";
import { Toast, ToastPosition } from "../../../types/toast";
import ToastItem from "./toast";

const positionMap: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export default function ToastContainer({
  toasts,
  position = "top-right",
  onRemove,
}: {
  toasts: Toast[];
  position?: ToastPosition;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className={`fixed z-50 ${positionMap[position]}`}
      style={{ width: "auto", maxWidth: "calc(100vw - 32px)" }}
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => onRemove(t.id)} />
        ))}
      </div>
    </div>
  );
}
