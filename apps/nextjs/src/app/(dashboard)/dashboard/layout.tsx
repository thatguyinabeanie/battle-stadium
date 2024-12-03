interface LayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: LayoutProps) {
  return (
    <section
      role="status"
      aria-label="Loading dashboard content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      <div className="min-h-[100dvh] flex-1 rounded-xl bg-neutral-900/50 md:min-h-min">
        {children}
      </div>
    </section>
  );
}
