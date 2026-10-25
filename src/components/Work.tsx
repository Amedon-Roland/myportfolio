"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, sideWork } from "@/data/site";
import { CaseSheet } from "./CaseSheet";
import { SectionHeading } from "./SectionHeading";

// Bento rhythm: wide, narrow / narrow, wide / half, half.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];

/** Track the pointer so the card border can light up where it is. */
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export function Work() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="travaux" className="px-gutter relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Projets"
          title={
            <>
              Six produits en ligne,
              <br />
              <span className="text-muted">construits de bout en bout.</span>
            </>
          }
          intro="Églises, écoles, santé, familles : des produits utilisés chaque jour. Ouvrez un projet pour voir comment il a été fait."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-12">
          {projects.map((p, i) => (
            <li key={p.slug} className={spans[i]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                onPointerMove={spotlight}
                aria-haspopup="dialog"
                className="spotlight glass group flex h-full w-full flex-col overflow-hidden rounded-[28px] p-3 text-left transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-raised">
                  <Image
                    src={`/work/${p.slug}-d.jpg`}
                    alt={`Page d'accueil de ${p.name}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ground/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="glass absolute right-3 top-3 grid h-10 w-10 translate-y-1 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 px-3 pb-3 pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.03em]">{p.name}</h3>
                    <span className="tabular text-[13px] text-muted">{p.year}</span>
                  </div>
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-muted">{p.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {[p.domain, ...p.stack.slice(0, 2)].map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-[12px] text-fg/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-semibold tracking-tight">Autres projets</h3>
            <p className="mt-3 max-w-[32ch] text-muted">
              Outils internes, expériences et scripts partagés en open source.
            </p>
          </div>
          <ul className="glass divide-y divide-line overflow-hidden rounded-[24px] lg:col-span-8">
            {sideWork.map((s) => {
              const body = (
                <>
                  <span className="min-w-0">
                    <span className="block font-medium">{s.name}</span>
                    <span className="mt-0.5 block text-[14px] text-muted">{s.note}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-[13px] text-muted">
                    <span className="hidden sm:inline">{s.stack}</span>
                    {s.url && <ArrowUpRight className="h-4 w-4 text-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </span>
                </>
              );
              return (
                <li key={s.name}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${s.name}, code source sur GitHub`}
                      className="group flex items-center justify-between gap-6 px-6 py-4 transition-colors hover:bg-glass"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-6 px-6 py-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <CaseSheet index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
