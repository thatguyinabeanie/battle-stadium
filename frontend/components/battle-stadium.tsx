import type { IconSvgProps } from "@/types";

import React from "react";
import { Link } from "@/components/nextui-use-client";

export const BattleStadiumIcon: React.FC<IconSvgProps> = ({ size = 32, width, height, ...props }) => (
  <svg fill="none" height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function BattleStadium() {
  return (
    <div className="flex gap-3 mx-2">
      <div className="flex rounded-full bg-foreground ">
        <Link href="/">
          <BattleStadiumIcon aria-label="Battle Stadium Logo" className="text-background" />
        </Link>
      </div>

      <Link href="/" size="sm">
        <span aria-label="Battle Stadium Name" className="text-xs font-bold uppercase opacity-100">
          Battle Stadium
        </span>
      </Link>
    </div>
  );
}
