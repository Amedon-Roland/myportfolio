"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A soft ring that trails the pointer and grows over anything clickable.
 * Fine pointers only; the native cursor stays visible underneath.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current!;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const hot = (e.target as Element).closest?.("a, button, input, [data-cursor]");
      gsap.to(el, { scale: hot ? 1.9 : 1, opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-accent/60 bg-accent/10 opacity-0"
    />
  );
}
