export const siteConfig = {
  name: "Battle Stadium",
  description:
    "A modern tournament platform. Built by the community, for the community.",
};

interface NavbarItemConfig {
  value: string;
  label: string;
}

export const NavbarItemsConfigs: NavbarItemConfig[] = [
  {
    value: "organizations",
    label: "Organizations",
  },
  {
    value: "tournaments",
    label: "Tournaments",
  },
  {
    value: "players",
    label: "Players",
  },
  {
    value: "analytics",
    label: "Analytics",
  },
];

export type SiteConfig = typeof siteConfig;
