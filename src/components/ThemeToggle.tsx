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

/** Dark is the default; the light theme is remembered once chosen. */
export function ThemeToggle({ lang }: { lang: Lang }) {
  const light = useSyncExternalStore(subscribe, isLight, () => false);

  const toggle = () => {
    const next = light ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? ui.theme.toDark[lang] : ui.theme.toLight[lang]}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
    >
      {light ? <Moon className="h-[18px] w-[18px]" aria-hidden /> : <Sun className="h-[18px] w-[18px]" aria-hidden />}
    </button>
  );
}
