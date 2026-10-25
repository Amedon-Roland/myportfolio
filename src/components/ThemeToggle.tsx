"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const media = () => window.matchMedia("(prefers-color-scheme: light)");

function current(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return media().matches ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = media();
  mq.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

/** Switches between the indigo night theme and the cotton day theme. */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, current, () => null);
  const next: Theme = theme === "light" ? "dark" : "light";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !document.startViewTransition) {
      apply();
      return;
    }

    // The new theme spreads out from the button, like dye through cloth.
    const { clientX: x, clientY: y } = e;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Passer au thème ${next === "light" ? "clair" : "sombre"}` : "Changer de thème"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg/80 transition-colors hover:border-fg hover:text-fg"
    >
      {/* Half-filled disc: the filled side shows the theme you would switch to. */}
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
