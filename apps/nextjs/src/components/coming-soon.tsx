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
    <div className="flex min-h-screen flex-col pt-4">
      <div className="animate-fade-in space-y-6 rounded-xl bg-white/10 p-8 text-center shadow-xl backdrop-blur-lg">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          {children}
        </div>
        <p className="text-xl">Coming Soon</p>
      </div>
    </div>
  );
}
