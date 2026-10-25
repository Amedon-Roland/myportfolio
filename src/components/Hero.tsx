"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Loom } from "./Loom";
import { LiveClock } from "./LiveClock";
import { site } from "@/data/site";

export function Hero() {
  const below = useRef<HTMLDivElement>(null);

  const reveal = () => {
    gsap.to(below.current, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" });
  };

  return (
    <section id="haut" className="px-gutter relative flex min-h-dvh flex-col justify-end pb-10 pt-28">
      <div className="text-[clamp(4.5rem,min(30vw,40svh),24rem)] md:text-[clamp(5.5rem,min(25vw,33svh),24rem)]">
        <Loom lines={["Roland", "Amedon"]} onWoven={reveal} />
      </div>

      <div
        ref={below}
        className="hero-below mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end"
      >
        <p className="text-[clamp(1.3rem,2.1vw,1.9rem)] leading-[1.32] text-fg md:col-span-7 lg:col-span-6">
          Développeur full-stack à Lomé. Je conçois et je code des sites, des applications mobiles et
          des back-offices pour les églises, les écoles, la santé et les familles d&apos;Afrique de
          l&apos;Ouest.
        </p>

        <dl className="font-display grid grid-cols-2 gap-x-8 gap-y-4 text-[15px] md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <div>
            <dt className="text-muted">Statut</dt>
            <dd className="mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
              </span>
              Disponible
            </dd>
          </div>
          <div>
            <dt className="text-muted">Heure à {site.city}</dt>
            <dd className="mt-1">
              <LiveClock />
            </dd>
          </div>
          <div>
            <dt className="text-muted">Spécialité</dt>
            <dd className="mt-1">Web, mobile et back-office</dd>
          </div>
          <div>
            <dt className="text-muted">Outils</dt>
            <dd className="mt-1">Next.js, Flutter, Laravel</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
