"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#data", label: "Data" },
  { href: "#travaux", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#a-propos", label: "À propos" },
  { href: "#atelier", label: "Atelier" },
];

/** Floating glass bar; it tightens once the page scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="px-gutter fixed inset-x-0 top-0 z-40 pt-4">
      <div
        className={`glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-500 ${
          scrolled ? "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]" : "border-transparent bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <a href="#haut" className="flex items-center gap-3 pl-1" aria-label="Roland Amedon, retour en haut">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[13px] font-semibold text-on-accent">
            RA
          </span>
          <span className="hidden text-[15px] font-medium tracking-tight sm:inline">Roland Amedon</span>
        </a>

        <nav aria-label="Principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[14px]">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-fg/70 transition-colors hover:bg-glass hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[14px] font-medium text-ground transition-transform hover:scale-[1.03]"
          >
            Discutons
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
