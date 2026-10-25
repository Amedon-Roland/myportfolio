"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { method } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Four steps on a rail that fills as the section scrolls past. */
export function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-rail]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="methode" className="px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Méthode"
          title="Quatre étapes, aucune surprise"
          intro="Vous savez à chaque moment où en est votre projet, et ce qui vient ensuite."
        />

        <div data-steps className="relative mt-16">
          <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-line md:block" />
          <div data-rail className="absolute left-0 right-0 top-[22px] hidden h-px origin-left bg-gradient-to-r from-accent to-accent-2 md:block" />

          <ol className="grid gap-5 md:grid-cols-4">
            {method.map((m, i) => (
              <li key={m.title} className="relative">
                <span className="glass relative z-10 grid h-11 w-11 place-items-center rounded-full text-[14px] font-semibold tabular">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[1.35rem] font-semibold tracking-[-0.02em]">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
