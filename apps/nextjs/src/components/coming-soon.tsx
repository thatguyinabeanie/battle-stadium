interface ComingSoonProps {
  title: string;
}
export default function ComingSoon({ title }: Readonly<ComingSoonProps>) {
  return (
    <article className="m-4 flex flex-col px-4 py-8 sm:px-8 md:px-16 lg:px-80">
      <section className="animate-fade-in space-y-6 rounded-xl bg-white/10 p-8 text-center shadow-xl backdrop-blur-lg">
        <h1 className="text-4xl font-bold">{title}</h1>

        <div
          className="flex flex-col items-center"
          aria-label="Construction Status"
        >
          <h1 className="text-xl font-semibold">Under construction</h1>
        </div>

        <p className="text-xl" aria-label="Feature status">
          Coming Soon
        </p>
      </section>
    </article>
  );
}
