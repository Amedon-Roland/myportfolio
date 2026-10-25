"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);

  // The portrait drifts slower than the page for a little depth.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-parallax]",
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="a-propos" className="px-gutter relative py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="glass relative rounded-[32px] p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-raised">
              <div data-parallax className="absolute inset-[-8%]">
                <Image
                  src={site.portrait}
                  alt={`Portrait de ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] text-white">
                <span className="font-medium">{site.name}</span>
                <span className="text-white/70">{site.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading tag="À propos" title="Derrière les projets" />
          <p className="mt-8 max-w-[34ch] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-snug tracking-[-0.015em]">
            {about.lead}
          </p>
          {about.body.map((t) => (
            <p key={t} className="mt-5 max-w-[56ch] leading-[1.75] text-muted">
              {t}
            </p>
          ))}

          <dl className="mt-10 grid grid-cols-2 gap-3">
            {about.facts.map((f) => (
              <div key={f.label} className="glass rounded-2xl px-5 py-4">
                <dt className="text-[13px] text-muted">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
