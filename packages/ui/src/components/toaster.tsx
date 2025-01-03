"use client";

import { useToast } from "../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="bg-background">
          <div className="grid gap-1" role="alert" aria-live="polite">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>

          {action && <div role="presentation">{action}</div>}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
