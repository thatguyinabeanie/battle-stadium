import type { ReactNode } from "react";

interface ComingSoonProps {
  title: string;
  children: ReactNode
}
export default function ComingSoon ({ title, children }: Readonly<ComingSoonProps>) {
  return (
    <div className="min-h-screen flex flex-col pt-4">
      <div className="text-center space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            { title }
          </h1>
          <p className="text-xl">{ title } Coming Soon</p>
        </div>
        { children }
      </div>
    </div>
  )
}
