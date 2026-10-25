"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
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
      <div ref={backdrop} className="absolute inset-0 bg-ground/70 backdrop-blur-md" onClick={onClose} />

      <div
        ref={panel}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-[3vh] overflow-y-auto overscroll-contain rounded-t-[32px] border-t border-line bg-raised"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-40 blur-[100px]"
          style={{ background: `radial-gradient(50% 60% at 50% 0%, ${p.thread}, transparent)` }}
        />

        <div className="px-gutter sticky top-0 z-10 py-4">
          <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 text-[14px]">
            <span className="text-muted">
              Projet {shown + 1} sur {projects.length}
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 font-medium text-ground transition-transform hover:scale-[1.03]"
            >
              <X className="h-4 w-4" /> Fermer
            </button>
          </div>
        </div>

        <article className="px-gutter relative pb-16 pt-6 md:pt-12">
          <div className="mx-auto max-w-6xl">
            <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-fg/75">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.thread }} />
                  {p.domain}
                </span>
                <h2 id="case-title" className="mt-5 text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  {p.name}
                </h2>
              </div>
              <p className="text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-muted lg:col-span-5">{p.summary}</p>
            </header>

            <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Année", p.year],
                ["Domaine", p.domain],
                ["Rôle", p.role],
                ["Technologies", p.stack.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="glass rounded-2xl px-5 py-4">
                  <dt className="text-[13px] text-muted">{k}</dt>
                  <dd className="tabular mt-1 text-[15px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <figure className="glass mt-8 rounded-[28px] p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ground">
                <Image
                  src={`/work/${p.slug}-d.jpg`}
                  alt={`Page d'accueil de ${p.name} sur ordinateur`}
                  fill
                  sizes="(min-width: 1200px) 1150px, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              {host && <figcaption className="px-3 pb-1 pt-3 text-[13px] text-muted">{host}</figcaption>}
            </figure>

            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <section className="lg:col-span-5">
                <h3 className="text-xl font-semibold tracking-tight">Le besoin</h3>
                <p className="mt-4 text-[1.05rem] leading-[1.75] text-muted">{p.need}</p>
              </section>
              <section className="lg:col-span-6 lg:col-start-7">
                <h3 className="text-xl font-semibold tracking-tight">Ce que j&apos;ai construit</h3>
                <ul className="mt-4 space-y-3">
                  {p.built.map((b) => (
                    <li key={b} className="flex gap-3 text-[1.02rem] leading-relaxed text-fg/85">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-16 grid items-start gap-5 md:grid-cols-12">
              <div className="glass rounded-[28px] p-3 md:col-span-8">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ground">
                  <Image
                    src={`/work/${p.slug}-d2.jpg`}
                    alt={`Une section intérieure de ${p.name}`}
                    fill
                    sizes="(min-width: 768px) 62vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="glass mx-auto w-[64%] rounded-[36px] p-2.5 md:col-span-4 md:w-full md:max-w-[300px]">
                <div className="relative aspect-[390/844] overflow-hidden rounded-[28px] bg-ground">
                  <Image
                    src={`/work/${p.slug}-m.jpg`}
                    alt={`${p.name} sur téléphone`}
                    fill
                    sizes="(min-width: 768px) 22vw, 60vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-medium text-on-accent"
                >
                  Visiter le site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span />
              )}
              <button type="button" onClick={() => onNavigate(next)} className="group text-left sm:text-right">
                <span className="block text-[13px] text-muted">Projet suivant</span>
                <span className="mt-1 flex items-center gap-2 text-3xl font-semibold tracking-tight sm:justify-end">
                  {projects[next].name}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
