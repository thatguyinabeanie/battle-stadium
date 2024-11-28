import type { FC } from "react";
import Link from "next/link";

import type { IconSvgProps } from "~/types";

export const BattleStadiumIcon: FC<IconSvgProps> = ({
  size = 32,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export function BattleStadiumLogoLink() {
  return (
    <div className="flex rounded-full bg-foreground">
      <Link prefetch={true} className="text-primary" href="/">
        <BattleStadiumIcon
          aria-label="Battle Stadium Logo"
          className="text-background background-none"
        />
      </Link>
    </div>
  );
}

export default function BattleStadium() {
  return (
    <div
      aria-label="Battle Stadium Navigation"
      className="flex flex-row gap-2 md:gap-4"
    >
      <BattleStadiumLogoLink />

      <Link
        className="invisible flex-row items-center justify-center text-lg font-bold text-primary opacity-100 lg:flex"
        href="/"
      >
        Battle Stadium
      </Link>
    </div>
  );
}
