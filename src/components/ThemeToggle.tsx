"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { ui, type Lang } from "@/i18n";

const isLight = () => document.documentElement.dataset.theme === "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function apply(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

/**
 * Dark is the default; the light theme is remembered once chosen.
 * In the animated experience the new theme opens as a circle from the button
 * (View Transitions API). Lite visitors and older browsers switch instantly.
 */
export function ThemeToggle({ lang }: { lang: Lang }) {
  const light = useSyncExternalStore(subscribe, isLight, () => false);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = light ? "dark" : "light";
    const root = document.documentElement;
    if (!document.startViewTransition || !root.classList.contains("motion")) {
      apply(next);
      return;
    }

    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);
    root.classList.add("theme-switching");

    const transition = document.startViewTransition(() => apply(next));
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? ui.theme.toDark[lang] : ui.theme.toLight[lang]}
      className="theme-toggle grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
    >
      <span key={light ? "moon" : "sun"} className="theme-icon grid place-items-center">
        {light ? <Moon className="h-[18px] w-[18px]" aria-hidden /> : <Sun className="h-[18px] w-[18px]" aria-hidden />}
      </span>
    </button>
  );
}
