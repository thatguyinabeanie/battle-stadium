import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { forwardRef } from "react";
import { X } from "lucide-react";

import { cn } from "../utils";

// Type definitions
export type ChipVariant = "solid" | "bordered" | "light" | "flat";
export type ChipSize = "sm" | "md" | "lg";
export type ChipRadius = "full" | "lg" | "md" | "sm";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  radius?: ChipRadius;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactNode;
}

export const ChipVariants: Record<ChipVariant, string> = {
  solid: "bg-primary text-primary-foreground hover:bg-primary/90",
  bordered: "border-2 border-primary bg-background hover:bg-primary/10",
  light: "bg-primary/20 text-primary hover:bg-primary/30",
  flat: "bg-default-100 hover:bg-default-200",
};

export const ChipSizes: Record<ChipSize, string> = {
  sm: "text-sm px-2 py-0.5 h-6",
  md: "text-md px-3 py-1 h-7",
  lg: "text-base px-4 py-1.5 h-8",
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      variant = "solid",
      size = "md",
      radius = "full",
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      // Base styles
      "inline-flex items-center justify-center gap-1",
      "font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "cursor-default select-none",

      // Variant styles
      ChipVariants[variant],

      // Size styles
      ChipSizes[size],

      // Radius styles
      radius === "full"
        ? "rounded-full"
        : radius === "lg"
          ? "rounded-lg"
          : radius === "md"
            ? "rounded-md"
            : "rounded-sm",

      // Disabled state
      "disabled:pointer-events-none disabled:opacity-50",

      className,
    );

    return (
      <div ref={ref} className={baseStyles} {...props}>
        {children}
        {onClose && (
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClose(e);
            }}
            className="inline-flex items-center justify-center rounded-full hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ padding: size === "sm" ? "2px" : "4px" }}
          >
            <X size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
