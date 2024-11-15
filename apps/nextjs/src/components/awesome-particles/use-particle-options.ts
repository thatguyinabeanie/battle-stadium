"use client";

import type { ISourceOptions } from "@tsparticles/engine";
import { MoveDirection } from "@tsparticles/engine";

import { useTheme } from "@battle-stadium/ui";

const baseOptions: ISourceOptions = {
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      push: {
        quantity: 20,
      },
      repulse: {
        distance: 100,
        quantity: 3,
      },
    },
  },
  particles: {
    color: {
      value: "#555",
    },
    links: {
      color: "#555",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 0.5,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      random: true,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 500,
      limit: { value: 600 },
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.2, max: 1.5 },
    },
  },
  detectRetina: true,
  smooth: true,
}
export default function useParticlesOptions (): ISourceOptions {
  const { theme } = useTheme();

  const isLight = theme?.includes("light");

  const colorHex = isLight ? "#555" : "#fff"
  return {
    ...baseOptions,
    particles: {
      ...(baseOptions.particles),
      links: {
        color: colorHex,
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 0.5,
      },
      color: {
        value: colorHex
      },
    }
  };
}
