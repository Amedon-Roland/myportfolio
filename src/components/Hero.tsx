"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowDown, MapPin } from "lucide-react";
import { LiveClock } from "./LiveClock";
import { projects, site } from "@/data/site";

gsap.registerPlugin(useGSAP, SplitText);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const intro = gsap.utils.toArray<HTMLElement>("[data-intro]", el);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(intro, { opacity: 1 });
        return;
      }

      // Reveal the containers first so the from() tweens below animate towards 1.
      gsap.set(intro, { opacity: 1 });
      const split = SplitText.create("[data-headline]", { type: "words", mask: "words" });
      // A clipped gradient does not reach split words; give each word its own.
      split.words.forEach((w) => {
        if ((w as HTMLElement).closest(".text-gradient")) (w as HTMLElement).classList.add("text-gradient");
      });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-portrait]", { yPercent: 12, opacity: 0, duration: 1.6 }, 0)
        .from("[data-glow]", { scale: 0.6, opacity: 0, duration: 2 }, 0)
        .from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.045 }, 0.15)
        .from("[data-rise]", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.55)
        .from("[data-chip]", { scale: 0.8, opacity: 0, duration: 0.9, stagger: 0.1, ease: "back.out(1.6)" }, 0.9);

      // Chips and portrait drift with the pointer for a sense of depth.
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", el).map((node) => ({
        depth: Number(node.dataset.depth),
        x: gsap.quickTo(node, "x", { duration: 1, ease: "power3.out" }),
        y: gsap.quickTo(node, "y", { duration: 1, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX / innerWidth - 0.5;
        const dy = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(dx * l.depth);
          l.y(dy * l.depth);
        });
      };
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <section id="haut" ref={root} className="px-gutter relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 md:pt-32">
      {/* Atmosphere */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="aurora pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-end gap-10 lg:grid-cols-12">
        <div className="pb-6 lg:col-span-7 lg:self-center lg:pb-0">
          <div data-intro data-rise className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-fg/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            Disponible pour de nouveaux projets
          </div>

          <h1
            data-intro
            data-headline
            className="mt-7 text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          >
            Je transforme les <span className="text-gradient">données</span> en produits qui
            servent vraiment.
          </h1>

          <p data-intro data-rise className="mt-7 max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-muted">
            Je suis Roland Amedon, data engineer et développeur full-stack à Lomé. Je construis des
            pipelines de données, des tableaux de bord et les applications web et mobile qui s&apos;en
            servent.
          </p>

          <div data-intro data-rise className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#travaux"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--glow)] transition-transform hover:scale-[1.03]"
            >
              Voir mes projets
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center rounded-full px-6 py-3 font-medium transition-colors hover:border-fg/30"
            >
              Me contacter
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[min(64svh,560px)] lg:col-span-5 lg:h-[min(80svh,780px)]">
          <div
            data-intro
            data-glow
            aria-hidden
            className="absolute inset-x-[8%] bottom-[6%] top-[14%] rounded-full blur-[70px]"
            style={{ background: "radial-gradient(closest-side, var(--color-accent), var(--color-accent-2) 55%, transparent)", opacity: 0.45 }}
          />
          <div data-intro data-portrait data-depth="-14" className="relative mx-auto aspect-[670/1130] h-full">
            <Image
              src={site.cutout}
              alt="Portrait de Roland Amedon en costume"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
            />
          </div>

          <div data-intro data-chip data-depth="26" className="glass absolute left-0 bottom-[30%] rounded-2xl px-4 py-3 text-[13px] xl:-left-16">
            <div className="flex items-center gap-1.5 text-muted">
              <MapPin className="h-3.5 w-3.5" /> {site.city}, {site.country}
            </div>
            <div className="mt-0.5 text-[15px] font-medium">
              <LiveClock /> <span className="text-muted">heure locale</span>
            </div>
          </div>

          <div data-intro data-chip data-depth="40" className="glass absolute right-0 top-[22%] rounded-2xl px-4 py-3 xl:-right-12">
            <div className="text-[28px] font-semibold leading-none tracking-tight">{projects.length}</div>
            <div className="mt-1 text-[13px] text-muted">produits en ligne</div>
          </div>

          <div data-intro data-chip data-depth="18" className="glass absolute bottom-[3%] right-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] xl:right-[-8%]">
            Python · SQL · Next.js
          </div>
        </div>
      </div>
    </section>
  );
}
