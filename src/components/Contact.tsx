"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { WovenMark } from "./WovenMark";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="relative pt-28 md:pt-40">
      <div className="px-gutter">
        <h2 className="display-tight text-[clamp(3.8rem,12.5vw,12rem)]">
          Construisons
          <br />
          la suite
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <p className="max-w-[36ch] text-[clamp(1.25rem,1.9vw,1.7rem)] leading-snug text-fg/85 md:col-span-6">
            Un site à refaire, une application à lancer, un outil interne qui vous ferait gagner des
            heures : écrivez-moi en quelques phrases et parlons-en.
          </p>

          <div className="font-display md:col-span-6 md:col-start-7">
            <a
              href={`mailto:${site.email}`}
              className="block break-all text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-tight tracking-[-0.02em] underline decoration-accent decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[15px]">
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-fg"
              >
                {copied ? "Adresse copiée" : "Copier l'adresse"}
              </button>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-fg"
              >
                GitHub
              </a>
              <span className="sr-only" aria-live="polite">
                {copied ? "Adresse e-mail copiée dans le presse-papiers" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-32">
        <div className="kente-band" />
        <div className="font-display px-gutter flex flex-col gap-4 py-8 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3 text-fg">
            <WovenMark className="h-4 w-4" />
            © 2026 Roland Amedon
          </span>
          <span>Conçu et codé à Lomé, Togo</span>
          <a href="#haut" className="hover:text-fg">
            Revenir en haut
          </a>
        </div>
      </footer>
    </section>
  );
}
