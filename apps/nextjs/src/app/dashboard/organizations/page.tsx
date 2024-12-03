import ComingSoon from "~/components/coming-soon";

export default function DashboardDefault() {
  return (
    <div className="m-4 flex flex-col px-4 py-8 sm:px-8 md:px-16 lg:px-80">
      <ComingSoon title="Organizations Dashboard Home">
        <section
          className="flex flex-col items-center"
          aria-label="Construction Status"
        >
          <h1 className="text-xl font-semibold">Under construction</h1>
        </section>
      </ComingSoon>
    </div>
  );
}
