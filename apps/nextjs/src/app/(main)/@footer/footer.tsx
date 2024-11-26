import Link from "next/link";

import BattleStadium from "~/components/battle-stadium";
import { LineMdGithubLoop, LineMdTwitter } from "~/components/svg/icons";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Github",
    href: "https://github.com/thatguyinabeanie/battle-stadium",
  },
];

const socialItems = [
  {
    name: "Twitter",
    href: "https://x.com/thatguyinabeani",
    icon: (props: { className?: string }) => <LineMdTwitter {...props} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/thatguyinabeanie/battle-stadium/",
    icon: (props: { className?: string }) => <LineMdGithubLoop {...props} />,
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex items-center justify-center">
        <BattleStadium />
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {navLinks.map((item) => (
          <Link
            prefetch={true}
            key={item.name}
            className="text-primary"
            href={item.href}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-x-4">
        {socialItems.map((item) => (
          <Link
            prefetch={true}
            key={item.name}
            className="text-primary"
            href={item.href}
          >
            <span className="sr-only">{item.name}</span>
            <item.icon aria-hidden="true" className="w-5" />
          </Link>
        ))}
      </div>

      <p className="text-small mt-1 text-center text-primary">
        &copy; 2024 Beanie LLC Inc. All rights reserved.
      </p>
    </footer>
  );
}
