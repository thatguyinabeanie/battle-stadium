import ComingSoon from "~/components/coming-soon";

export default function TournamentHistory() {
  return (
    <div className="m-4 flex flex-col px-4 sm:px-8 md:px-16 lg:px-80 py-8">
      <ComingSoon title="Tournament History">
        <div className="flex flex-col items-center" role="status" aria-label="Construction Status">
          <h2 className="text-xl font-semibold">Tournament History is Under Construction</h2>
        </div>
      </ComingSoon>
    </div>
  );
}
