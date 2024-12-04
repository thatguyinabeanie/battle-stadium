import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Bot, Frame, GalleryVerticalEnd, PieChart } from "lucide-react";

export const siteConfig = {
  name: "Battle Stadium",
  description:
    "A modern tournament platform. Built by the community, for the community.",
};

interface NavbarItemConfig {
  value: string;
  label: string;
  logo: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const NavbarItemsConfigs: NavbarItemConfig[] = [
  {
    value: "organizations",
    label: "Organizations",
    logo: GalleryVerticalEnd,
  },
  {
    value: "tournaments",
    label: "Tournaments",
    logo: Frame,
  },
  {
    value: "players",
    label: "Players",
    logo: Bot,
  },
  {
    value: "articles",
    label: "Articles",
    logo: GalleryVerticalEnd,
  },
  {
    value: "analytics",
    label: "Analytics",
    logo: PieChart,
  },
];

export type SiteConfig = typeof siteConfig;
