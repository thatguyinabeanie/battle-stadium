import { type DashboardLayoutProps } from "~/types";
import { getAccountMe } from "~/app/server-actions/accounts/actions";

export default async function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const me = (await getAccountMe())?.data;

  return (
    <div>
      <h2>TODO: Dashboard</h2>
      {me && <p>Welcome, {me.email}</p>}
      {children}
    </div>
  );
}
