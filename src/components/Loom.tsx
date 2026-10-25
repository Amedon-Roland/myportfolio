"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const STRIPS = 12;

type LoomProps = {
  lines: [string, string];
  onWoven?: () => void;
};

/**
 * The name, cut into vertical strips like the narrow bands of a kente cloth.
 * On load the strips slide in from alternate edges and a gold weft thread is
 * passed across them. Afterwards the strips part slightly around the pointer.
 */
export function Loom({ lines, onWoven }: LoomProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const strips = gsap.utils.toArray<HTMLElement>("[data-strip]", el);
      const thread = el.querySelector<HTMLElement>("[data-thread]")!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // The server renders the strips offset in CSS; hand that state to GSAP.
      gsap.set(strips, { clearProps: "transform" });
      gsap.set(strips, { yPercent: (i) => (i % 2 ? 104 : -104) });

      if (reduce) {
        gsap.set(strips, { yPercent: 0 });
        gsap.set(thread, { scaleX: 1 });
        onWoven?.();
        return;
      }

      gsap
        .timeline({ delay: 0.2, onComplete: onWoven })
        .to(strips, {
          yPercent: 0,
          duration: 1.5,
          ease: "expo.inOut",
          stagger: { each: 0.06, from: "center" },
        })
        .to(thread, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, "-=0.55");

      // Threads part around the pointer once the cloth is woven.
      const setters = strips.map((s) => gsap.quickTo(s, "y", { duration: 0.9, ease: "power3.out" }));
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine) return;

      const onMove = (e: PointerEvent) => {
        const box = el.getBoundingClientRect();
        const sigma = box.width / 9;
        strips.forEach((_, i) => {
          const center = box.left + ((i + 0.5) / STRIPS) * box.width;
          const d = e.clientX - center;
          const pull = Math.exp(-(d * d) / (2 * sigma * sigma));
          setters[i]((i % 2 ? 1 : -1) * pull * 16);
        });
      };
      const onLeave = () => setters.forEach((set) => set(0));

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root },
  );

  const name = (
    <span className="block">
      <span className="block">{lines[0]}</span>
      <span className="block pl-[0.38em] md:pl-[0.62em]">{lines[1]}</span>
    </span>
  );

  return (
    <div ref={root} className="loom relative select-none">
      <h1 className="sr-only">{lines.join(" ")}</h1>
      <noscript>
        <style>{`.loom [data-strip]{transform:none!important}.loom [data-thread]{transform:none!important}.hero-below{opacity:1!important;visibility:visible!important;transform:none!important}`}</style>
      </noscript>

      {/* Invisible copy that gives the block its size. */}
      <div aria-hidden className="display-tight invisible">
        {name}
      </div>

      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {Array.from({ length: STRIPS }, (_, i) => (
          <div
            key={i}
            data-strip
            className="display-tight absolute inset-0 will-change-transform"
            style={{
              clipPath: `inset(0 ${100 - ((i + 1) / STRIPS) * 100}% 0 ${(i / STRIPS) * 100}%)`,
              color: i % 2 ? "var(--strip-alt)" : "var(--color-fg)",
              transform: `translateY(${i % 2 ? 104 : -104}%)`,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      <div
        aria-hidden
        data-thread
        className="absolute left-0 right-0 top-1/2 h-[2px] origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
