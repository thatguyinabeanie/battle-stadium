import type { IconProps } from "@iconify/react";

import Link from "next/link";

import { Icon } from "@iconify/react";
import BattleStadium from "./battle-stadium";

type SocialIconProps = Omit<IconProps, "icon">;

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
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:twitter" />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/thatguyinabeanie/battle-stadium/",
    icon: (props: SocialIconProps) => (
      <Icon {...props} icon="fontisto:github" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-8">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <BattleStadium />
        </div>

        {/* <Spacer y={4} /> */}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {navLinks.map((item) => (
            <Link key={item.name} className="text-primary" href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        {/* <Spacer y={6} /> */}
        <div className="flex justify-center gap-x-4">
          {socialItems.map((item) => (
            <Link key={item.name} className="text-primary" href={item.href}>
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="w-5" />
            </Link>
          ))}
        </div>
        {/* <Spacer y={4} /> */}
        <p className="text-small text-default-400 mt-1 text-center">
          &copy; 2024 Beanie LLC Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
