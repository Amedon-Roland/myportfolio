"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { site } from "@/data/site";

function GitHubMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

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
    <section id="contact" className="px-gutter pt-16 md:pt-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-line bg-raised px-6 py-20 text-center md:px-12 md:py-28">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="aurora pointer-events-none absolute -bottom-48 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full opacity-70 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />

        <div className="relative">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-fg/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            Disponible pour de nouveaux projets
          </span>

          <h2 className="mx-auto mt-7 max-w-[14ch] text-[clamp(2.6rem,7vw,5.8rem)] font-semibold leading-[1] tracking-[-0.05em]">
            Un projet en tête&nbsp;? <span className="text-gradient inline-block whitespace-nowrap">Parlons-en.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-[1.08rem] leading-relaxed text-muted">
            Un site à refaire, une application à lancer, un outil interne qui vous ferait gagner des
            heures : écrivez-moi en quelques phrases.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--glow)] transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              M&apos;écrire un e-mail
            </a>
            <button
              type="button"
              onClick={copy}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium transition-colors hover:border-fg/30"
            >
              {copied ? <Check className="h-4 w-4 text-leaf" /> : <Copy className="h-4 w-4" />}
              {copied ? "Adresse copiée" : site.email}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Adresse e-mail copiée dans le presse-papiers" : ""}
            </span>
          </div>
        </div>
      </div>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 py-10 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {site.name}. Conçu et codé à Lomé.</span>
        <div className="flex items-center gap-2">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-fg transition-colors hover:border-fg/30"
          >
            <GitHubMark className="h-4 w-4" /> GitHub
          </a>
          <a href="#haut" className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-fg transition-colors hover:border-fg/30">
            Haut de page <ArrowUpRight className="h-4 w-4 -rotate-45" />
          </a>
        </div>
      </footer>
    </section>
  );
}
