"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";
import { projects } from "@/data/site";

type Props = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Case study sheet: a cotton page that slides over the indigo site. */
export function CaseSheet({ index, onClose, onNavigate }: Props) {
  const [shown, setShown] = useState<number | null>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  // Mount when a project is picked; the close animation unmounts it.
  if (index !== null && index !== shown) setShown(index);

  useEffect(() => {
    if (shown === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (index === null) {
      gsap
        .timeline({
          onComplete: () => {
            setShown(null);
            lenis.current?.start();
            document.documentElement.style.overflow = "";
            returnFocus.current?.focus();
          },
        })
        .to(panel.current, { yPercent: 100, duration: reduce ? 0 : 0.6, ease: "power3.in" })
        .to(backdrop.current, { autoAlpha: 0, duration: reduce ? 0 : 0.3 }, "<0.2");
      return;
    }

    panel.current?.scrollTo({ top: 0 });
  }, [index, shown, lenis]);

  // Entrance, once per opening.
  const opened = shown !== null;
  useEffect(() => {
    if (!opened) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    returnFocus.current = document.activeElement as HTMLElement;
    lenis.current?.stop();
    document.documentElement.style.overflow = "hidden";
    gsap.fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.4 });
    gsap.fromTo(
      panel.current,
      { yPercent: 100 },
      { yPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out", onComplete: () => closeBtn.current?.focus() },
    );
  }, [opened, lenis]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose]);

  if (shown === null) return null;
  const p = projects[shown];
  const next = (shown + 1) % projects.length;
  const host = p.url ? new URL(p.url).host : null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="case-title">
      <div ref={backdrop} className="absolute inset-0 bg-ground/75 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={panel}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-[4vh] overflow-y-auto overscroll-contain rounded-t-[22px] bg-fg text-inverse"
      >
        <div className="h-2.5 w-full" style={{ background: p.thread }} />

        <div className="font-display px-gutter sticky top-0 z-10 flex items-center justify-between bg-fg/90 py-4 text-[15px] backdrop-blur">
          <span className="text-inverse/60">
            Projet {shown + 1} sur {projects.length}
          </span>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="rounded-full border border-inverse/20 px-4 py-1.5 transition-colors hover:bg-inverse hover:text-fg"
          >
            Fermer
          </button>
        </div>

        <article className="px-gutter pb-16 pt-6 md:pt-10">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 id="case-title" className="display-tight text-[clamp(3.4rem,10vw,9.5rem)] md:col-span-8">
              {p.name}
            </h2>
            <p className="max-w-[34ch] text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug md:col-span-4">
              {p.summary}
            </p>
          </header>

          <dl className="font-display mt-12 grid grid-cols-2 gap-6 border-y border-inverse/15 py-6 text-[15px] md:grid-cols-4">
            <div>
              <dt className="text-inverse/55">Année</dt>
              <dd className="tabular mt-1">{p.year}</dd>
            </div>
            <div>
              <dt className="text-inverse/55">Domaine</dt>
              <dd className="mt-1">{p.domain}</dd>
            </div>
            <div>
              <dt className="text-inverse/55">Rôle</dt>
              <dd className="mt-1">{p.role}</dd>
            </div>
            <div>
              <dt className="text-inverse/55">Technologies</dt>
              <dd className="mt-1">{p.stack.join(", ")}</dd>
            </div>
          </dl>

          <figure className="mt-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-inverse/5 shadow-[0_30px_60px_-30px_rgba(20,26,48,0.45)]">
              <Image
                src={`/work/${p.slug}-d.jpg`}
                alt={`Page d'accueil de ${p.name} sur ordinateur`}
                fill
                sizes="(min-width: 768px) 92vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
            {host && <figcaption className="font-display mt-3 text-sm text-inverse/55">{host}</figcaption>}
          </figure>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <section className="md:col-span-5">
              <h3 className="font-display text-xl font-semibold">Le besoin</h3>
              <p className="mt-4 text-[1.2rem] leading-[1.6]">{p.need}</p>
            </section>
            <section className="md:col-span-6 md:col-start-7">
              <h3 className="font-display text-xl font-semibold">Ce que j&apos;ai construit</h3>
              <ul className="mt-4 space-y-3 text-[1.2rem] leading-[1.5]">
                {p.built.map((b) => (
                  <li key={b} className="flex gap-4">
                    <span className="mt-[0.7em] h-px w-5 shrink-0" style={{ background: p.thread }} />
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-16 grid items-start gap-6 md:grid-cols-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-inverse/5 md:col-span-8">
              <Image
                src={`/work/${p.slug}-d2.jpg`}
                alt={`Une section intérieure de ${p.name}`}
                fill
                sizes="(min-width: 768px) 62vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative mx-auto aspect-[390/844] w-[62%] overflow-hidden rounded-[26px] border-[6px] border-inverse bg-inverse md:col-span-3 md:col-start-10 md:w-full">
              <Image
                src={`/work/${p.slug}-m.jpg`}
                alt={`${p.name} sur téléphone`}
                fill
                sizes="(min-width: 768px) 22vw, 60vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="font-display mt-16 flex flex-col gap-6 border-t border-inverse/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center rounded-full bg-inverse px-6 py-3 text-fg transition-colors hover:bg-line"
              >
                Visiter le site en ligne
              </a>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group text-left sm:text-right"
            >
              <span className="block text-sm text-inverse/55">Projet suivant</span>
              <span className="block text-3xl font-semibold tracking-tight underline decoration-transparent decoration-2 underline-offset-8 transition-colors group-hover:decoration-[var(--color-accent)]">
                {projects[next].name}
              </span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
