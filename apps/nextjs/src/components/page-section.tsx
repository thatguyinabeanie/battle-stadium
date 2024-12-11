import { cn } from "@battle-stadium/ui";

interface PageSectionProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export function PageSection({ children, label, className = "" }: PageSectionProps) {
  return (
    <section
      aria-label={label}
      className={cn("z-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950", className)}
    >
      {children}
    </section>
  );
}