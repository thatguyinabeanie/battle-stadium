"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

import useParticleOptions from "./use-particle-options";

export default function AwesomeParticles() {
  const [init, setInit] = useState(false);
  const options = useParticleOptions();
  // this should be run only once per application lifetime

  useEffect(() => {
    try {
      initParticlesEngine(loadFull)
        .then(() => setInit(true))
        .catch((error) => {
          console.log("error", error);
          setInit(false);
        });
    } catch (error) {
      console.error("Error initializing particles:", error);
      setInit(false);
    }
  }, []);

  if (!init) {
    return <></>;
  }

  return <Particles id="tsparticles" options={options} />;
}
