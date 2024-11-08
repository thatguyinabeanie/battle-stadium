"use client";

import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import useParticleOptions from "./use-particle-options";

export default function AwesomeParticles() {
  const [init, setInit] = useState(false);

  const options = useParticleOptions();

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      return await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) {
    return <></>;
  }

  return <Particles id="tsparticles" options={options} />;
}
