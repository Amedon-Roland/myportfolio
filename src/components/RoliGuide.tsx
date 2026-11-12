"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ui, type Lang } from "@/i18n";
import { Roli } from "./Roli";

type Topic = keyof typeof ui.roli.lines;

/** Sections Roli comments on, by the id of their heading (home page). */
const SECTIONS: Topic[] = ["projets", "services", "a-propos", "contact"];

/**
 * Roli follows the visitor around the site from the bottom-left corner.
 * It says one short line when a new section comes into view, another when
 * clicked, and can be tucked away (remembered on this device).
 */
export function RoliGuide({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const topic = useRef<Topic>("intro");
  const turn = useRef(0);
  const timer = useRef<number>(0);
  const box = useRef<HTMLDivElement>(null);

  const say = (t: Topic, next = false) => {
    const lines = ui.roli.lines[t][lang];
    if (t !== topic.current) turn.current = 0;
    else if (next) turn.current = (turn.current + 1) % lines.length;
    topic.current = t;
    setLine(lines[turn.current]);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLine(null), 5000);
  };

  // Remembered choice.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a stored preference once
      setHidden(localStorage.getItem("roli") === "hidden");
    } catch {}
  }, []);

  // Greet on arrival (after the opening screen), then comment on sections.
  useEffect(() => {
    const first: Topic = document.getElementById("projets")
      ? "intro"
      : /\/(projets|projects)\//.test(location.pathname)
        ? "project"
        : "lost";
    const greet = window.setTimeout(() => say(first), 2600);

    const targets = [
      ...SECTIONS.map((id) => [id, document.getElementById(id)?.closest("section")] as const),
      ["reel", document.getElementById("reel-title")?.closest("section")] as const,
    ].filter((entry): entry is readonly [Topic, HTMLElement] => Boolean(entry[1]));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const found = targets.find(([, el]) => el === e.target);
          if (found && found[0] !== topic.current) say(found[0]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach(([, el]) => io.observe(el));
    return () => {
      window.clearTimeout(greet);
      window.clearTimeout(timer.current);
      io.disconnect();
      topic.current = "intro";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run per page only
  }, [pathname, lang]);

  // The pupils follow the pointer (motion experience only).
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = box.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.max(1, Math.hypot(dx, dy));
        el.style.setProperty("--look-x", `${((dx / d) * 4).toFixed(2)}px`);
        el.style.setProperty("--look-y", `${((dy / d) * 3).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const toggle = (value: boolean) => {
    setHidden(value);
    setLine(null);
    try {
      localStorage.setItem("roli", value ? "hidden" : "shown");
    } catch {}
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => toggle(false)}
        aria-label={ui.roli.show[lang]}
        className="roli-peek fixed bottom-0 left-4 z-40 h-11 w-14 overflow-hidden rounded-t-2xl"
      >
        <Roli className="absolute left-1/2 top-1 w-12 -translate-x-1/2" />
      </button>
    );
  }

  return (
    <div ref={box} className="roli-guide fixed bottom-3 left-3 z-40 flex items-end gap-2 sm:bottom-5 sm:left-5">
      <button
        type="button"
        onClick={() => say(topic.current, true)}
        aria-label={ui.roli.talk[lang]}
        className="group relative h-16 w-14 shrink-0 rounded-2xl sm:h-20 sm:w-[4.5rem]"
      >
        <Roli mood={line ? "wave" : "idle"} className="h-full w-full" />
      </button>

      <div
        aria-live="polite"
        className={`roli-bubble relative mb-10 max-w-[13.5rem] rounded-2xl rounded-bl-md border border-line bg-raised px-3.5 py-2.5 text-[14px] leading-snug shadow-lg shadow-black/20 sm:mb-12 sm:max-w-[16rem] ${
          line ? "is-open" : ""
        }`}
      >
        <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-accent">ROLI</span>
        <span>{line}</span>
        <button
          type="button"
          onClick={() => toggle(true)}
          aria-label={ui.roli.hide[lang]}
          className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-line bg-ground text-muted hover:text-fg"
        >
          <X aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
