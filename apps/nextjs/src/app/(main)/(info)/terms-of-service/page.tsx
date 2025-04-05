const asIsDisclaimer =
  'The service is provided on an "as is" and "as available" basis without any warranties of any kind.';
export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 items-end">
        <div className="flex flex-row">
          <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
          <h2 className="mb-6 items-start text-lg">(WIP)</h2>
        </div>{" "}
      </div>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">1. Acceptance of Terms</h3>
        <p className="text-base">
          By accessing and using our service, you accept and agree to be bound
          by the terms and provisions of this agreement.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">2. Service Usage</h3>
        <p className="text-base">
          You agree to use the service only for purposes permitted by the Terms
          and in accordance with applicable laws and regulations.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">3. User Responsibilities</h3>
        <p className="text-base">
          You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your computer.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">4. Privacy Policy</h3>
        <p className="text-base">
          Your privacy is important to us. Please read our Privacy Policy to
          understand how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">5. Legal Disclaimers</h3>
        <p className="text-base">{asIsDisclaimer}</p>
      </section>

      <section className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">6. Changes to Terms</h3>
        <p className="text-base">
          We reserve the right to modify or replace these Terms at any time. It
          is your responsibility to check the Terms periodically for changes.
        </p>
      </section>
    </div>
  );
}
