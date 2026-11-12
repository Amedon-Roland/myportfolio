"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ui, type Lang } from "@/i18n";

const R = 20;
const C = 2 * Math.PI * R;

/**
 * Back-to-top button, shown once the visitor has scrolled a screen down.
 * The ring around it fills with reading progress. Scrolls with Lenis when the
 * motion experience is on, otherwise jumps (or glides, if motion is welcome).
 */
export function BackToTop({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const y = scrollY;
      setVisible(y > innerHeight * 0.8);
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - (max > 0 ? Math.min(1, y / max) : 0)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    const lenis = (window as Window & { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis && document.documentElement.classList.contains("motion")) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      const calm = document.documentElement.classList.contains("lite");
      scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={ui.roli.top[lang]}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`back-to-top fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-raised text-fg shadow-lg shadow-black/20 transition-[opacity,transform] duration-300 hover:border-muted sm:bottom-6 sm:right-6 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <ArrowUp aria-hidden className="h-4 w-4" />
    </button>
  );
}
