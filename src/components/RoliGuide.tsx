"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Gamepad2, X } from "lucide-react";
import { ui, type Lang } from "@/i18n";
import { Roli, type RoliMood } from "./Roli";

type Topic = keyof typeof ui.roli.lines;
type Action = "jump" | "spin" | "enter" | null;

/** Sections Roli comments on, by the id of their heading (home page). */
const SECTIONS: Topic[] = ["projets", "services", "a-propos", "contact"];
const SLEEP_AFTER = 15000;

/** A number between 0 and 1, for the game's random hops (only called from events). */
function randomUnit() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

/**
 * Roli rides along in the bottom-left corner.
 *
 * - pops in, then says one short line per section as it comes into view;
 * - looks at the pointer, leans into the scroll, cheers on fast scrolling;
 * - hover: happy; click: talks, jumps or spins; too many clicks: dizzy;
 * - reacts to the theme switch, to copying the email and to back-to-top;
 * - falls asleep when nothing happens, wakes up startled;
 * - can be picked up and dragged; let go and it falls, then runs home;
 * - hops when the page changes (it lives outside the pages);
 * - can be tucked away (remembered on this device).
 */
export function RoliGuide({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [mood, setMood] = useState<RoliMood>("idle");
  const [action, setAction] = useState<{ name: Action; key: number }>({
    name: "enter",
    key: 0,
  });

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
  const mover = useRef<HTMLDivElement>(null);
  const [held, setHeld] = useState(false);
  const [running, setRunning] = useState(false);
  const drag = useRef<{
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    x: number;
    y: number;
    moved: boolean;
    lastX: number;
  } | null>(null);
  const runAnim = useRef<Animation | null>(null);
  const swallowClick = useRef(false);
  const [flying, setFlying] = useState(false);
  const flyRaf = useRef(0);
  const trail = useRef<{ x: number; y: number; t: number }[]>([]);
  const [game, setGame] = useState<{ score: number; left: number } | null>(
    null,
  );
  const gameRef = useRef<{
    score: number;
    end: number;
    hop: number;
    tick: number;
  } | null>(null);
  const firstPage = useRef(true);

  const act = useCallback(
    (name: Action) => setAction((a) => ({ name, key: a.key + 1 })),
    [],
  );

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

  const sayText = useCallback((text: string, ms = 4800) => {
    quietUntil.current = performance.now() + ms;
    setLine(text);
    window.clearTimeout(lineTimer.current);
    lineTimer.current = window.setTimeout(() => setLine(null), ms);
  }, []);

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

  // While Roli is held, flying or playing, page text must not get selected.
  const busy = held || flying || game !== null;
  useEffect(() => {
    document.documentElement.classList.toggle("roli-busy", busy);
    if (busy) getSelection()?.removeAllRanges();
  }, [busy]);

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
    const arriving = !firstPage.current;
    firstPage.current = false;
    if (arriving) {
      act("jump");
      feel("happy", 900);
    }
    const greet = window.setTimeout(
      () => {
        say(first);
        feel("wave", 2400);
      },
      arriving ? 900 : 2600,
    );

    const targets = [
      ...SECTIONS.map(
        (id) => [id, document.getElementById(id)?.closest("section")] as const,
      ),
      [
        "reel",
        document.getElementById("reel-title")?.closest("section"),
      ] as const,
    ].filter((entry): entry is readonly [Topic, HTMLElement] =>
      Boolean(entry[1]),
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const found = targets.find(([, el]) => el === e.target);
          if (
            found &&
            found[0] !== topic.current &&
            performance.now() > quietUntil.current
          ) {
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
  }, [pathname, lang, say, feel, act]);

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
      settle = window.setTimeout(
        () => box.current?.style.setProperty("--lean", "0deg"),
        160,
      );
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
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

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

  /** Current offset of Roli from its home corner (also mid-run). */
  const currentOffset = () => {
    const el = mover.current;
    if (!el) return { x: 0, y: 0 };
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return { x: m.m41, y: m.m42 };
  };

  const place = (x: number, y: number) => {
    if (mover.current)
      mover.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  /** Back home: falls to the ground if dropped in the air, then runs. */
  const runHome = (x: number, y: number) => {
    const el = mover.current;
    if (!el) return;
    const motion = document.documentElement.classList.contains("motion");
    if (!motion || Math.hypot(x, y) < 6) {
      el.style.transform = "";
      return;
    }
    el.style.setProperty("--face", x > 0 ? "-1" : "1");
    const fall = y < -12 ? Math.min(650, 220 + Math.sqrt(-y) * 16) : 0;
    const run = Math.min(2400, Math.max(500, Math.abs(x) * 1.5));
    const frames: Keyframe[] = [
      {
        transform: `translate(${x}px, ${y}px)`,
        easing: "cubic-bezier(0.55, 0, 1, 0.45)",
      },
    ];
    if (fall)
      frames.push({
        transform: `translate(${x}px, 0px)`,
        offset: fall / (fall + run),
        easing: "cubic-bezier(0.45, 0, 0.25, 1)",
      });
    frames.push({ transform: "translate(0px, 0px)" });
    setRunning(true);
    feel("happy", 0);
    say("run", { keepTopic: true });
    const anim = el.animate(frames, { duration: fall + run, fill: "forwards" });
    runAnim.current = anim;
    anim.onfinish = () => {
      el.style.transform = "";
      el.style.setProperty("--face", "1");
      anim.cancel();
      runAnim.current = null;
      setRunning(false);
      act("jump");
      feel("wave", 1600);
      say("home", { keepTopic: true });
    };
  };

  /** Where Roli may go, as offsets from its home corner. */
  const bounds = () => {
    const home = box.current!.getBoundingClientRect();
    return {
      minX: -home.left + 4,
      maxX: innerWidth - home.left - 76,
      minY: -home.top + 72,
      maxY: 0,
    };
  };

  /** Thrown: flies, spins, bounces off the edges and the floor, then runs home. */
  const fling = (x: number, y: number, vx: number, vy: number) => {
    const el = mover.current;
    if (!el) return;
    const b = bounds();
    let last = performance.now();
    let spin = 0;
    let bounces = 0;
    setFlying(true);
    feel("wow", 0);
    say("throw", { keepTopic: true });
    const step = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      vy += 0.0026 * dt;
      x += vx * dt;
      y += vy * dt;
      spin += vx * dt * 0.9;
      if (x < b.minX) [x, vx, bounces] = [b.minX, -vx * 0.6, bounces + 1];
      if (x > b.maxX) [x, vx, bounces] = [b.maxX, -vx * 0.6, bounces + 1];
      if (y < b.minY) [y, vy] = [b.minY, -vy * 0.5];
      if (y > 0) {
        y = 0;
        vx *= 0.8;
        if (Math.abs(vy) > 0.3) {
          vy = -vy * 0.5;
          bounces++;
        } else vy = 0;
      }
      if (y === 0) spin *= 0.85;
      place(x, y);
      el.style.setProperty("--lean", `${(spin % 360).toFixed(1)}deg`);
      if (y === 0 && vy === 0 && Math.abs(vx) < 0.05) {
        el.style.setProperty("--lean", "0deg");
        setFlying(false);
        const dizzy = bounces >= 3;
        if (dizzy) {
          feel("dizzy", 1500);
          say("dizzy", { keepTopic: true });
        }
        window.setTimeout(() => runHome(x, 0), dizzy ? 1500 : 250);
        return;
      }
      flyRaf.current = requestAnimationFrame(step);
    };
    flyRaf.current = requestAnimationFrame(step);
  };

  /* ---- Mini-game: catch Roli as many times as you can in 15 s. ---- */

  const hopTo = (x: number, y: number, ms: number) => {
    const el = mover.current;
    if (!el) return;
    const from = currentOffset();
    el.style.setProperty("--face", x < from.x ? "-1" : "1");
    const anim = el.animate(
      [
        { transform: `translate(${from.x}px, ${from.y}px)` },
        { transform: `translate(${x}px, ${y}px)` },
      ],
      {
        duration: document.documentElement.classList.contains("motion")
          ? ms
          : 0,
        easing: "cubic-bezier(0.5, 0, 0.2, 1)",
      },
    );
    place(x, y);
    runAnim.current = anim;
  };

  const hopSomewhere = () => {
    const g = gameRef.current;
    if (!g) return;
    const b = bounds();
    const x = b.minX + randomUnit() * (b.maxX - b.minX);
    const y = b.minY + randomUnit() * (b.maxY - b.minY);
    hopTo(x, y, 280);
    window.clearTimeout(g.hop);
    g.hop = window.setTimeout(hopSomewhere, Math.max(520, 1100 - g.score * 45));
  };

  const endGame = () => {
    const g = gameRef.current;
    if (!g) return;
    window.clearTimeout(g.hop);
    window.clearInterval(g.tick);
    gameRef.current = null;
    setGame(null);
    let best = 0;
    try {
      best = Number(localStorage.getItem("roli-best")) || 0;
      if (g.score > best) localStorage.setItem("roli-best", String(g.score));
    } catch {}
    const t = ui.roli.game;
    const record = g.score > best && g.score > 0;
    const { x, y } = currentOffset();
    runHome(x, y);
    window.setTimeout(() => {
      feel(record ? "happy" : "wave", 2500);
      sayText(
        record
          ? t.record[lang].replace("{n}", String(g.score))
          : t.end[lang]
              .replace("{n}", String(g.score))
              .replace("{best}", String(Math.max(best, g.score))),
        5500,
      );
    }, 1200);
  };

  const startGame = () => {
    if (gameRef.current) return;
    poke();
    cancelAnimationFrame(flyRaf.current);
    runAnim.current?.cancel();
    const g = { score: 0, end: performance.now() + 15000, hop: 0, tick: 0 };
    gameRef.current = g;
    setGame({ score: 0, left: 15 });
    setLine(null);
    feel("happy", 0);
    sayText(ui.roli.game.start[lang], 1800);
    g.tick = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((g.end - performance.now()) / 1000));
      setGame({ score: g.score, left });
      if (left === 0) endGame();
    }, 250);
    window.setTimeout(hopSomewhere, 1200);
  };

  const caught = () => {
    const g = gameRef.current;
    if (!g) return;
    g.score += 1;
    setGame((cur) => (cur ? { ...cur, score: g.score } : cur));
    act("spin");
    feel(g.score % 3 === 0 ? "dizzy" : "wow", 500);
    hopSomewhere();
  };

  useEffect(
    () => () => {
      const g = gameRef.current;
      if (g) {
        window.clearTimeout(g.hop);
        window.clearInterval(g.tick);
      }
      cancelAnimationFrame(flyRaf.current);
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || gameRef.current) return;
    poke();
    cancelAnimationFrame(flyRaf.current);
    setFlying(false);
    trail.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
    const { x, y } = currentOffset();
    runAnim.current?.cancel();
    runAnim.current = null;
    place(x, y);
    setRunning(false);
    drag.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: x,
      oy: y,
      x,
      y,
      moved: false,
      lastX: e.clientX,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 6) return;
    if (!d.moved) {
      d.moved = true;
      setHeld(true);
      feel("wow", 0);
      say("grab", { keepTopic: true });
    }
    // Keep Roli on screen.
    const home = box.current!.getBoundingClientRect();
    d.x = Math.max(
      -home.left + 4,
      Math.min(innerWidth - home.left - 76, d.ox + dx),
    );
    d.y = Math.max(-home.top + 4, Math.min(0, d.oy + dy));
    place(d.x, d.y);
    const now = performance.now();
    trail.current = [
      ...trail.current.filter((p) => now - p.t < 90),
      { x: e.clientX, y: e.clientY, t: now },
    ];
    const swing = Math.max(-25, Math.min(25, (e.clientX - d.lastX) * 1.6));
    d.lastX = e.clientX;
    mover.current?.style.setProperty("--lean", `${swing.toFixed(1)}deg`);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    swallowClick.current = true;
    setHeld(false);
    mover.current?.style.setProperty("--lean", "0deg");
    const pts = trail.current;
    const first = pts[0];
    const lastPt = pts[pts.length - 1];
    const dt = lastPt && first ? Math.max(16, lastPt.t - first.t) : 16;
    const vx = first ? (lastPt.x - first.x) / dt : 0;
    const vy = first ? (lastPt.y - first.y) / dt : 0;
    const motion = document.documentElement.classList.contains("motion");
    if (motion && Math.hypot(vx, vy) > 0.8) fling(d.x, d.y, vx * 1.4, vy * 1.4);
    else runHome(d.x, d.y);
  };

  const onClick = () => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    if (gameRef.current) {
      caught();
      return;
    }
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
        <Roli
          mood="sleep"
          className="absolute left-1/2 top-1 w-12 -translate-x-1/2"
        />
      </button>
    );
  }

  return (
    <div
      ref={box}
      style={{ viewTransitionName: "roli" }}
      className="roli-guide fixed bottom-3 left-3 z-40 sm:bottom-5 sm:left-5"
    >
      <div
        ref={mover}
        className={`roli-mover flex items-end gap-2 ${held ? "is-held" : ""} ${running ? "is-running" : ""} ${flying ? "is-flying" : ""} ${game ? "is-playing" : ""}`}
      >
        <button
          type="button"
          onClick={onClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={() => mood !== "sleep" && feel("happy", 1600)}
          aria-label={ui.roli.talk[lang]}
          className={`roli-lean relative h-16 w-14 shrink-0 touch-none select-none rounded-2xl sm:h-20 sm:w-[4.5rem] ${
            held ? "cursor-grabbing" : "cursor-grab"
          } ${action.name ? `roli-act-${action.name}` : ""}`}
        >
          <span className="roli-face block h-full w-full">
            <Roli key={action.key} mood={mood} className="h-full w-full" />
          </span>
        </button>

        <div
          aria-live="polite"
          className={`roli-bubble relative mb-10 max-w-[13.5rem] rounded-2xl rounded-bl-md border border-line bg-raised px-3.5 py-2.5 text-[14px] leading-snug shadow-lg shadow-black/20 sm:mb-12 sm:max-w-[16rem] ${
            line ? "is-open" : ""
          }`}
        >
          <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
            ROLI
          </span>
          <span>{line}</span>
          {!game && (
            <button
              type="button"
              onClick={startGame}
              aria-label={ui.roli.game.label[lang]}
              className="mt-2 flex h-8 items-center gap-1.5 rounded-full bg-accent px-3 text-[13px] font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              <Gamepad2 aria-hidden className="h-3.5 w-3.5" />
              {ui.roli.game.play[lang]}
            </button>
          )}
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
      {game && (
        <p
          role="status"
          className="fixed left-1/2 top-20 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-line bg-raised px-4 py-2 text-[14px] font-semibold shadow-lg shadow-black/20"
        >
          <Gamepad2 aria-hidden className="h-4 w-4 text-accent" />
          <span>
            {ui.roli.game.caught[lang]} :{" "}
            <span className="tabular-nums">{game.score}</span>
          </span>
          <span className="tabular-nums text-muted">{game.left} s</span>
        </p>
      )}
    </div>
  );
}
