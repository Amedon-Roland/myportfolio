"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KENTE, weave, type Cloth } from "@/lib/weave";

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
    <section ref={section} id="atelier" className="px-gutter bg-indigo pb-32 pt-28 md:pt-40">
      <div className="grid gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <h2 className="display-tight text-[clamp(3.6rem,9vw,8.5rem)]">
            Tissez
            <br />
            votre nom
          </h2>
          <p className="mt-8 max-w-[38ch] text-xl leading-relaxed text-cotton/80">
            Chaque lettre choisit un motif et deux couleurs du kente, puis le métier les tisse bande
            après bande. Le même prénom donne toujours le même tissu.
          </p>

          <form onSubmit={submit} className="font-display mt-10 max-w-md" noValidate>
            <label htmlFor="weave-name" className="text-[15px] text-haze">
              Votre prénom
            </label>
            <div className="mt-2 flex gap-3">
              <input
                id="weave-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                autoComplete="given-name"
                aria-invalid={!!error}
                aria-describedby={error ? "weave-error" : undefined}
                className="min-w-0 flex-1 rounded-full border border-indigo-line bg-indigo-deep px-5 py-3 text-lg text-cotton placeholder:text-haze/60 focus:border-gold focus:outline-none"
                placeholder="Ama, Kodjo, Élodie…"
              />
              <button
                type="submit"
                className="rounded-full bg-gold px-6 py-3 text-lg font-medium text-ink transition-colors hover:bg-cotton"
              >
                Tisser
              </button>
            </div>
            {error && (
              <p id="weave-error" role="alert" className="mt-3 text-[15px] text-gold">
                {error}
              </p>
            )}
          </form>
        </div>

        <figure className="md:col-span-6 md:col-start-7">
          <div className="relative mx-auto w-full max-w-[560px]">
            <canvas
              ref={canvas}
              width={WIDTH}
              height={HEIGHT}
              role="img"
              aria-label={`Motif de kente tissé à partir du prénom ${woven}`}
              className="block aspect-[4/5] w-full rounded-sm bg-ink shadow-[0_40px_80px_-30px_rgba(4,6,15,0.8)]"
            />
          </div>
          <figcaption className="font-display mx-auto mt-4 flex max-w-[560px] flex-wrap items-center justify-between gap-4 text-[15px] text-haze">
            <span className="tabular">
              {cloth
                ? `${woven}, ${cloth.strips} bandes, ${cloth.blocks} motifs, n° ${cloth.seed.toString(16).toUpperCase().slice(0, 6)}`
                : "Le métier attend."}
            </span>
            <button
              type="button"
              onClick={download}
              disabled={!cloth}
              className="text-cotton underline decoration-gold underline-offset-4 hover:text-gold disabled:opacity-40"
            >
              Télécharger le motif
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
