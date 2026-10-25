"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, site } from "@/data/site";
import { weave } from "@/lib/weave";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STRIPS = 5;

/** A cloth woven from the name, shown until a portrait is provided. */
function NameCloth() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = el.offsetWidth * dpr;
    el.height = el.offsetHeight * dpr;
    weave("Roland Amedon", 5).draw(el.getContext("2d")!, el.width, el.height);
  }, []);

  return <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function About() {
  const frame = useRef<HTMLDivElement>(null);

  // The portrait is cut into strips that slide into line as it scrolls into view.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-portrait-strip]",
        { yPercent: (i: number) => (i % 2 ? 9 : -9) },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top 85%", end: "center 55%", scrub: 0.6 },
        },
      );
    },
    { scope: frame },
  );

  return (
    <section id="a-propos" className="px-gutter pb-32 pt-28 md:pt-40">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div
            ref={frame}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface"
          >
            {Array.from({ length: STRIPS }, (_, i) => (
              <div
                key={i}
                data-portrait-strip
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - ((i + 1) / STRIPS) * 100}% 0 ${(i / STRIPS) * 100}%)` }}
              >
                {site.portrait ? (
                  <Image
                    src={site.portrait}
                    alt={i === 0 ? `Portrait de ${site.name}` : ""}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <NameCloth />
                )}
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-accent" />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:self-end">
          <h2 className="display-tight text-[clamp(3.6rem,9vw,8.5rem)]">
            Derrière
            <br />
            le métier
          </h2>
          <p className="mt-10 max-w-[30ch] text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.3]">{about.lead}</p>
          {about.body.map((t) => (
            <p key={t} className="mt-6 max-w-[48ch] text-[1.2rem] leading-[1.6] text-fg/80">
              {t}
            </p>
          ))}

          <dl className="font-display mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 text-[15px]">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-muted">{f.label}</dt>
                <dd className="mt-1 text-[17px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
