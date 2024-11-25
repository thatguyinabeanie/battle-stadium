import type { ReactNode } from "react";

import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";

import type { ChildrenProps } from "~/types";
import { MainSection } from "~/components/main-section";
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
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full flex-col items-center shadow-md backdrop-blur-[2px] dark:shadow-white/10 will-change-transform">
        {navbar}
        <MainSection>{children}</MainSection>
        {footer}
      </div>
    </div>
  );
}
