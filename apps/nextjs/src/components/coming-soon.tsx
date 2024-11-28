import type { ReactNode } from "react";

interface ComingSoonProps {
  title: string;
  children: ReactNode;
}
export default function ComingSoon({
  title,
  children,
}: Readonly<ComingSoonProps>) {
  return (
    <div className="animate-fade-in space-y-6 rounded-xl bg-white/10 p-8 text-center shadow-xl backdrop-blur-lg">
      <h1 className="text-4xl font-bold">{title}</h1>
      {children}
      <p className="text-xl" aria-label="Feature status">
        Coming Soon
      </p>
    </div>
  );
}
