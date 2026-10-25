"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { WovenMark } from "./WovenMark";

const links = [
  { href: "#travaux", label: "Travaux" },
  { href: "#a-propos", label: "À propos" },
  { href: "#methode", label: "Méthode", wide: true },
  { href: "#atelier", label: "Atelier", wide: true },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`font-display px-gutter fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between text-[15px] transition-colors duration-500 ${
        scrolled ? "bg-ground/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#haut" className="flex items-center gap-3" aria-label="Roland Amedon, retour en haut">
        <WovenMark className="h-5 w-5 text-fg" />
        <span className="hidden font-medium sm:inline">Roland Amedon</span>
      </a>
      <nav aria-label="Principale">
        <ul className="flex items-center gap-5 sm:gap-8">
          {links.map((l) => (
            <li key={l.href} className={l.wide ? "hidden md:block" : undefined}>
              <a href={l.href} className="group relative py-2 text-fg/80 transition-colors hover:text-fg">
                {l.label}
                <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
