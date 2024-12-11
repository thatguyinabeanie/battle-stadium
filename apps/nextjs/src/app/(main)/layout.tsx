import type { ReactNode } from "react";

import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";

import type { ChildrenProps } from "~/types";
import { env } from "~/env";
import { siteConfig } from "~/lib/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://battlestadium.gg"
      : "http://localhost:3000",
  ),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/beanie-72x72.png",
  },
  openGraph: {
    title: "Battle Stadium",
    description: siteConfig.description,
    url: "https://battlestadium.gg",
    siteName: "Battle Stadium",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thatguyinabeanie",
    creator: "@thatguyinabeanie",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutSlots extends ChildrenProps {
  navbar: ReactNode;
  footer: ReactNode;
}

export default function MainContentLayout({
  children,
}: Readonly<RootLayoutSlots>) {
  return (
    <main
      id="main-content"
      className="flex w-full max-w-[1300px] shrink-0 flex-col items-center will-change-transform"
    >
      {children}
    </main>
  );
}
