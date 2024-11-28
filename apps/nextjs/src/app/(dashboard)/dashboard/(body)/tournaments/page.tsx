import ComingSoon from "~/components/coming-soon";

export default function TournamentHistory() {
  return (
    <div className="m-4 flex flex-col px-4 py-8 sm:px-8 md:px-16 lg:px-80">
      <ComingSoon title="Tournament History">
        <section
          className="flex flex-col items-center"
          aria-label="Construction Status"
        >
          <h2 className="text-xl font-semibold">
            Tournament History is Under Construction
          </h2>
        </section>
      </ComingSoon>
    </div>
  );
}
