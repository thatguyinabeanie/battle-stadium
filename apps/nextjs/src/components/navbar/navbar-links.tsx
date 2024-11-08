import { cn } from "~/lib/utils";
import { NavbarItemsConfigs } from "~/lib/config/site";
import NavbarLink from "./navbar-link";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default function NavbarLinks({
  isSignedIn,
}: Readonly<NavbarLinksProps>) {
  return (
    <div className="hidden md:flex">
      {NavbarItemsConfigs.map(({ label, value }) => (
        <NavbarLink
          key={value}
          value={value}
          href={`/${value}`}
          label={label}
        />
      ))}

      <NavbarLink
        value="dashboard"
        key="dashboard"
        href="/dashboard"
        className={cn("hidden", {
          "sm:flex": isSignedIn,
        })}
        label="Dashboard"
      />
    </div>
  );
}
