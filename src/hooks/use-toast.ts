import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toast, ToastType } from "../types/toast";
import { ToastContext } from "@/components/ui/toast/toast-provider";

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");

  const push = (payload: Omit<Toast, "id">) => {
    const toast: Toast = { id: uuidv4(), ...payload };
    ctx.push(toast);
    return toast.id;
  };

  return {
    push,
    success: (payload: Omit<Toast, "id"> & { type?: ToastType }) =>
      push({ ...payload, type: "success" }),
    error: (payload: Omit<Toast, "id"> & { type?: ToastType }) =>
      push({ ...payload, type: "error" }),
    warning: (payload: Omit<Toast, "id"> & { type?: ToastType }) =>
      push({ ...payload, type: "warning" }),
    info: (payload: Omit<Toast, "id"> & { type?: ToastType }) =>
      push({ ...payload, type: "info" }),
    dismiss: (id: string) => ctx.remove(id),
  };
};

export default useToast;
