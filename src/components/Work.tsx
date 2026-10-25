"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { projects, sideWork } from "@/data/site";
import { CaseSheet } from "./CaseSheet";

gsap.registerPlugin(useGSAP);

export function Work() {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const section = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  // Floating preview that trails the pointer over the list (fine pointers only).
  useGSAP(
    () => {
      const el = preview.current!;
      gsap.set(el, { yPercent: -50, scale: 0.6, autoAlpha: 0 });
      move.current = {
        x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
      };
    },
    { scope: section },
  );

  const showPreview = (show: boolean) => {
    gsap.to(preview.current, {
      autoAlpha: show ? 1 : 0,
      scale: show ? 1 : 0.6,
      duration: show ? 0.5 : 0.3,
      ease: show ? "power3.out" : "power2.in",
      overwrite: "auto",
    });
  };

  return (
    <section ref={section} id="travaux" className="px-gutter relative pb-32 pt-28 md:pt-40">
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <h2 className="display-tight text-[clamp(3.6rem,11vw,10rem)] md:col-span-7">
          Travaux
          <br />
          choisis
        </h2>
        <p className="max-w-[38ch] text-xl leading-relaxed text-cotton/80 md:col-span-5 md:col-start-8 md:justify-self-end">
          Six produits en ligne, construits de bout en bout. Survolez un nom pour voir le produit,
          ouvrez-le pour lire comment il a été fait.
        </p>
      </div>

      <ul
        className="work-list border-b border-indigo-line"
        onPointerEnter={() => showPreview(true)}
        onPointerLeave={() => {
          showPreview(false);
          setHovered(null);
        }}
        onPointerMove={(e) => {
          // Sit beside the pointer, flipping sides past the middle of the screen.
          const width = preview.current?.offsetWidth ?? 0;
          const right = e.clientX < window.innerWidth * 0.5;
          move.current?.x(right ? e.clientX + 48 : e.clientX - width - 48);
          move.current?.y(e.clientY);
        }}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="work-row border-t border-indigo-line transition-opacity duration-500">
            <button
              type="button"
              onClick={() => setOpen(i)}
              onPointerEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left md:py-8"
              aria-haspopup="dialog"
            >
              <span className="font-display col-span-12 text-[clamp(2.3rem,6.4vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.025em] [font-variation-settings:'wdth'_82,'opsz'_96] md:col-span-7">
                <span className="inline-block transition-transform duration-700 ease-[var(--ease-out-soft)] md:group-hover:translate-x-4">
                  {p.name}
                </span>
              </span>
              <span className="col-span-8 mt-3 text-lg text-cotton/70 md:col-span-3 md:mt-0">{p.domain}</span>
              <span className="font-display tabular col-span-4 mt-3 justify-self-end text-[15px] text-haze md:col-span-2 md:mt-0">
                {p.year}
              </span>

              <span className="relative col-span-12 mt-6 block aspect-[16/10] overflow-hidden rounded-sm md:hidden">
                <Image
                  src={`/work/${p.slug}-d.jpg`}
                  alt={`Page d'accueil de ${p.name}`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[16/10] w-[min(34vw,520px)] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-20px_rgba(4,6,15,0.7)] md:block"
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: hovered === i ? 1 : 0 }}
          >
            <Image
              src={`/work/${p.slug}-d.jpg`}
              alt=""
              fill
              sizes="520px"
              className="object-cover object-top"
            />
            <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.thread }} />
          </div>
        ))}
      </div>

      <div className="mt-28 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight">Aussi sur l&apos;établi</h3>
          <p className="mt-3 max-w-[30ch] text-lg text-cotton/70">
            Des outils internes, des expériences et quelques scripts partagés en open source.
          </p>
        </div>
        <ul className="md:col-span-8">
          {sideWork.map((s) => (
            <li
              key={s.name}
              className="grid grid-cols-12 gap-x-4 gap-y-1 border-t border-indigo-line py-4 last:border-b"
            >
              <span className="font-display col-span-12 text-[17px] font-medium sm:col-span-4">{s.name}</span>
              <span className="col-span-12 text-[17px] text-cotton/70 sm:col-span-5">{s.note}</span>
              <span className="font-display col-span-12 flex items-baseline justify-between gap-4 text-sm text-haze sm:col-span-3 sm:flex-col sm:items-end sm:gap-1">
                {s.stack}
                {s.url && (
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-cotton underline decoration-gold decoration-1 underline-offset-4 hover:text-gold">
                    Code source
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <CaseSheet index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
