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
  navbar,
  footer,
  children,
}: Readonly<RootLayoutSlots>) {
  return (
    <div className="flex w-full shrink-0 flex-col items-center bg-neutral-950/75 shadow-md will-change-transform dark:shadow-white/10 lg:min-w-[1024px] lg:max-w-[1300px]">
      {navbar}

      <main
        className="flex min-h-screen w-full flex-col items-center"
      >
        <section
          role="region"
          aria-label="Main content"
          className="z-0 flex h-full w-full flex-col items-center gap-4"
        >
          {children}
        </section>
      </main>
      {footer}
    </div>
  );
}
