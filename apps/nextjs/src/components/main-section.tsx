import type { ChildrenProps } from "~/types";

export function MainSection({ children }: Readonly<ChildrenProps>) {
  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full flex-col items-center"
    >
      <section
        aria-label="Main content"
        className="z-0 flex h-full w-full flex-col items-center gap-4"
      >
        {children}
      </section>
    </main>
  );
}
