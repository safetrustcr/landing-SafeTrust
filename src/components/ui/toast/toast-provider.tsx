"use client";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Toast, ToastPosition } from "../../../types/toast";
import { toastManager } from "../../../lib/toast-manager";
import ToastContainer from "./toast-container";

export interface ToastContextValue {
  push: (toast: Toast) => void;
  remove: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 3,
}: {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastManager.setMaxActive(maxToasts);
    const unsub = toastManager.subscribe((ts) => setToasts(ts));
    return unsub;
  }, [maxToasts]);

  const value = useMemo(
    () => ({
      push: (t: Toast) => toastManager.push(t),
      remove: (id: string) => toastManager.remove(id),
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        onRemove={value.remove}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
