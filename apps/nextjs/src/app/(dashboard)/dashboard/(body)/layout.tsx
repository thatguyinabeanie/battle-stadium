interface DashboardBodyLayoutProps {
  children: React.ReactNode;
}

export default function DashboardBodyLayout({
  children,
}: DashboardBodyLayoutProps) {
  return (
    <section
      role="status"
      aria-label="Loading dashboard content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      {children}
    </section>
  );
}
