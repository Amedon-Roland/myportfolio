"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Sparkles } from "lucide-react";
import { KENTE, weave, type Cloth } from "@/lib/weave";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const WIDTH = 560;
const HEIGHT = 700;

/**
 * Type a first name, get a cloth. The pattern is woven row by row, with the
 * gold shuttle running along the edge that is being woven.
 */
export function Atelier() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const section = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [name, setName] = useState("Roland");
  const [woven, setWoven] = useState("Roland");
  const [cloth, setCloth] = useState<Cloth | null>(null);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback((word: string) => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = WIDTH * dpr;
    el.height = HEIGHT * dpr;

    const next = weave(word);
    const source = document.createElement("canvas");
    source.width = el.width;
    source.height = el.height;
    next.draw(source.getContext("2d")!, source.width, source.height);
    setCloth(next);

    const state = { p: 0 };
    const render = () => {
      const edge = Math.round(state.p * el.height);
      ctx.fillStyle = KENTE.ink;
      ctx.fillRect(0, 0, el.width, el.height);
      ctx.drawImage(source, 0, 0, el.width, edge, 0, 0, el.width, edge);
      if (state.p < 1) {
        ctx.fillStyle = KENTE.gold;
        ctx.fillRect(0, edge, el.width, 3 * dpr);
      }
    };

    tween.current?.kill();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      state.p = 1;
      render();
      return;
    }
    tween.current = gsap.to(state, { p: 1, duration: 2.2, ease: "power1.inOut", onUpdate: render });
  }, []);

  // Weave the default cloth the first time the section comes into view.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: "top 60%",
      once: true,
      onEnter: () => play("Roland"),
    });
    return () => {
      trigger.kill();
      tween.current?.kill();
    };
  }, [play]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const word = name.trim();
    if (!word) {
      setError("Écrivez un prénom pour tisser son motif.");
      return;
    }
    setError(null);
    setWoven(word);
    play(word);
  };

  const download = () => {
    canvas.current?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `motif-${woven.toLowerCase().replace(/\s+/g, "-")}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <section ref={section} id="atelier" className="px-gutter py-28 md:py-36">
      <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-[36px] p-6 md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-50 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, #e2a43a, transparent)" }}
        />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              tag="Atelier"
              title="Tissez votre prénom en kente"
              intro="Un petit clin d'œil au Togo : à Kpetoe, le kente se tisse en bandes étroites cousues bord à bord. Chaque lettre de votre prénom choisit un motif et ses couleurs. Le même prénom donne toujours le même tissu."
            />

            <form onSubmit={submit} className="mt-10 max-w-md" noValidate>
              <label htmlFor="weave-name" className="text-[13px] text-muted">
                Votre prénom
              </label>
              <div className="glass mt-2 flex gap-2 rounded-full p-1.5">
                <input
                  id="weave-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={24}
                  autoComplete="given-name"
                  aria-invalid={!!error}
                  aria-describedby={error ? "weave-error" : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-fg placeholder:text-muted focus:outline-none"
                  placeholder="Ama, Kodjo, Élodie…"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 font-medium text-on-accent transition-transform hover:scale-[1.03]"
                >
                  <Sparkles className="h-4 w-4" />
                  Tisser
                </button>
              </div>
              {error && (
                <p id="weave-error" role="alert" className="mt-3 text-[14px] text-accent">
                  {error}
                </p>
              )}
            </form>
          </div>

          <figure className="lg:col-span-5 lg:col-start-8">
            <div className="glass rounded-[28px] p-3">
              <canvas
                ref={canvas}
                width={WIDTH}
                height={HEIGHT}
                role="img"
                aria-label={`Motif de kente tissé à partir du prénom ${woven}`}
                className="block aspect-[4/5] w-full rounded-[20px] bg-[#141a30]"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 px-1 text-[13px] text-muted">
              <span className="tabular">
                {cloth ? `${woven} · ${cloth.strips} bandes · ${cloth.blocks} motifs` : "Le métier attend."}
              </span>
              <button
                type="button"
                onClick={download}
                disabled={!cloth}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg transition-colors hover:border-fg/40 disabled:opacity-40"
              >
                <Download className="h-3.5 w-3.5" /> Télécharger
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
