"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ui, type Lang } from "@/i18n";
import { Roli, type RoliMood } from "./Roli";

type Topic = keyof typeof ui.roli.lines;
type Action = "jump" | "spin" | "enter" | null;

/** Sections Roli comments on, by the id of their heading (home page). */
const SECTIONS: Topic[] = ["projets", "services", "a-propos", "contact"];
const SLEEP_AFTER = 15000;

/**
 * Roli rides along in the bottom-left corner.
 *
 * - pops in, then says one short line per section as it comes into view;
 * - looks at the pointer, leans into the scroll, cheers on fast scrolling;
 * - hover: happy; click: talks, jumps or spins; too many clicks: dizzy;
 * - reacts to the theme switch, to copying the email and to back-to-top;
 * - falls asleep when nothing happens, wakes up startled;
 * - can be tucked away (remembered on this device).
 */
export function RoliGuide({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [mood, setMood] = useState<RoliMood>("idle");
  const [action, setAction] = useState<{ name: Action; key: number }>({ name: "enter", key: 0 });

  const topic = useRef<Topic>("intro");
  const turn = useRef<Record<string, number>>({});
  const lineTimer = useRef(0);
  const moodTimer = useRef(0);
  const sleepTimer = useRef(0);
  const asleep = useRef(false);
  const clicks = useRef<number[]>([]);
  /** A reaction keeps the floor for a moment: section comments wait. */
  const quietUntil = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  const act = useCallback((name: Action) => setAction((a) => ({ name, key: a.key + 1 })), []);

  const feel = useCallback((m: RoliMood, ms = 1800) => {
    setMood(m);
    window.clearTimeout(moodTimer.current);
    if (ms) moodTimer.current = window.setTimeout(() => setMood("idle"), ms);
  }, []);

  const say = useCallback(
    (t: Topic, { keepTopic = false } = {}) => {
      if (keepTopic) quietUntil.current = performance.now() + 2600;
      const lines = ui.roli.lines[t][lang];
      const n = turn.current[t] ?? 0;
      turn.current[t] = (n + 1) % lines.length;
      if (!keepTopic) topic.current = t;
      setLine(lines[n]);
      window.clearTimeout(lineTimer.current);
      lineTimer.current = window.setTimeout(() => setLine(null), 4800);
    },
    [lang],
  );

  // Falls asleep when nothing happens; any activity wakes it up.
  const poke = useCallback(() => {
    window.clearTimeout(sleepTimer.current);
    if (asleep.current) {
      asleep.current = false;
      feel("wow", 1200);
      act("jump");
      say("wake", { keepTopic: true });
    }
    sleepTimer.current = window.setTimeout(() => {
      asleep.current = true;
      feel("sleep", 0);
      say("sleep", { keepTopic: true });
    }, SLEEP_AFTER);
  }, [act, feel, say]);

  // Remembered choice.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a stored preference once
      setHidden(localStorage.getItem("roli") === "hidden");
    } catch {}
  }, []);

  // Greets on arrival (after the opening screen), then comments on sections.
  useEffect(() => {
    const first: Topic = document.getElementById("projets")
      ? "intro"
      : /\/(projets|projects)\//.test(location.pathname)
        ? "project"
        : "lost";
    const greet = window.setTimeout(() => {
      say(first);
      feel("wave", 2400);
    }, 2600);

    const targets = [
      ...SECTIONS.map((id) => [id, document.getElementById(id)?.closest("section")] as const),
      ["reel", document.getElementById("reel-title")?.closest("section")] as const,
    ].filter((entry): entry is readonly [Topic, HTMLElement] => Boolean(entry[1]));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const found = targets.find(([, el]) => el === e.target);
          if (found && found[0] !== topic.current && performance.now() > quietUntil.current) {
            say(found[0]);
            feel(found[0] === "contact" ? "wave" : "happy", 1400);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach(([, el]) => io.observe(el));
    return () => {
      window.clearTimeout(greet);
      io.disconnect();
      topic.current = "intro";
    };
  }, [pathname, lang, say, feel]);

  // Eyes, lean, speed, sleep and the site's events.
  useEffect(() => {
    const motion = document.documentElement.classList.contains("motion");
    let frame = 0;
    let lastY = scrollY;
    let lastT = performance.now();
    let lean = 0;
    let fastCooldown = 0;

    const onMove = (e: PointerEvent) => {
      poke();
      if (!motion) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = box.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 4);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.max(1, Math.hypot(dx, dy));
        el.style.setProperty("--look-x", `${((dx / d) * 4).toFixed(2)}px`);
        el.style.setProperty("--look-y", `${((dy / d) * 3).toFixed(2)}px`);
      });
    };

    let settle = 0;
    const onScroll = () => {
      poke();
      if (!motion) return;
      const now = performance.now();
      const v = (scrollY - lastY) / Math.max(16, now - lastT); // px per ms
      lastY = scrollY;
      lastT = now;
      lean = Math.max(-14, Math.min(14, v * 9));
      box.current?.style.setProperty("--lean", `${lean.toFixed(1)}deg`);
      box.current?.style.setProperty("--look-y", `${v > 0 ? 3 : -3}px`);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => box.current?.style.setProperty("--lean", "0deg"), 160);
      if (Math.abs(v) > 2.5 && now > fastCooldown) {
        fastCooldown = now + 6000;
        feel("wow", 1200);
        say("fast", { keepTopic: true });
      }
    };

    const onKey = () => poke();

    const themeWatch = new MutationObserver(() => {
      const light = document.documentElement.dataset.theme === "light";
      feel("wow", 1300);
      act("jump");
      say(light ? "light" : "dark", { keepTopic: true });
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onCopy = () => {
      feel("happy", 2200);
      act("spin");
      say("copied", { keepTopic: true });
    };
    const onTop = () => {
      fastCooldown = performance.now() + 4000;
      feel("happy", 1500);
      act("jump");
      say("top", { keepTopic: true });
    };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    document.addEventListener("copy", onCopy);
    addEventListener("roli:top", onTop);
    poke();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.clearTimeout(sleepTimer.current);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
      removeEventListener("keydown", onKey);
      document.removeEventListener("copy", onCopy);
      removeEventListener("roli:top", onTop);
      themeWatch.disconnect();
    };
  }, [poke, feel, say, act]);

  useEffect(
    () => () => {
      window.clearTimeout(lineTimer.current);
      window.clearTimeout(moodTimer.current);
    },
    [],
  );

  const onClick = () => {
    poke();
    const now = performance.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2500), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      feel("dizzy", 2600);
      act("spin");
      say("dizzy", { keepTopic: true });
      return;
    }
    act(clicks.current.length % 2 ? "jump" : "spin");
    feel("happy", 1400);
    say(topic.current);
  };

  const toggle = (value: boolean) => {
    setHidden(value);
    setLine(null);
    if (!value) act("enter");
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
        <Roli mood="sleep" className="absolute left-1/2 top-1 w-12 -translate-x-1/2" />
      </button>
    );
  }

  return (
    <div ref={box} className="roli-guide fixed bottom-3 left-3 z-40 flex items-end gap-2 sm:bottom-5 sm:left-5">
      <button
        type="button"
        onClick={onClick}
        onPointerEnter={() => mood !== "sleep" && feel("happy", 1600)}
        aria-label={ui.roli.talk[lang]}
        className={`roli-lean relative h-16 w-14 shrink-0 rounded-2xl sm:h-20 sm:w-[4.5rem] ${action.name ? `roli-act-${action.name}` : ""}`}
      >
        <Roli key={action.key} mood={mood} className="h-full w-full" />
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
