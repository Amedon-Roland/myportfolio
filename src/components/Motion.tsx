"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __motionReady?: boolean;
    /** When the opening screen started (performance.now()), set by the boot script. */
    __introAt?: number;
  }
}

/**
 * Animations, loaded only when the visitor can afford them.
 *
 * The boot script in RootShell adds `motion` to <html> on a fast connection,
 * without data saving, with enough memory and without reduced motion. Only
 * then are GSAP and Lenis downloaded; everyone else gets the static page,
 * which is complete on its own.
 *
 * Markup hooks:
 *   data-split        headline revealed word by word
 *   data-intro        hero elements that rise in after the headline
 *   data-portrait     hero portrait, unveiled from the bottom
 *   data-reveal       container whose children rise in when scrolled into view
 *   data-parallax=N   element drifting N% against the scroll inside its frame
 *   data-spotlight    card whose border lights up under the pointer
 */
export function Motion() {
  // Re-run on every route change: each page brings its own elements to animate.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      window.__motionReady = true;

      const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -72 } });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        // Hero: words rise out of their line, then the rest follows.
        const split = SplitText.create("[data-split]", { type: "words", mask: "words" });
        root.classList.add("motion-ready");
        // If the opening screen is playing, start as it lifts (about 1.2 s in).
        const introLeft = root.classList.contains("intro-on") && window.__introAt !== undefined
          ? Math.max(0, 1.2 - (performance.now() - window.__introAt) / 1000)
          : 0;
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: introLeft })
          .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.05 }, 0.1)
          .from("[data-intro]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.45)
          .from(
            "[data-portrait]",
            { clipPath: "inset(100% 0% 0% 0% round 24px)", duration: 1.4, ease: "expo.inOut" },
            0.15,
          )
          .from("[data-portrait] img", { scale: 1.25, duration: 1.8 }, 0.15);

        // Content rises in as it scrolls into view.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((group) => {
          gsap.from(group.children, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        // Parallax: the inner layer drifts against the page inside its frame.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
          const amount = Number(layer.dataset.parallax) || 8;
          gsap.fromTo(
            layer,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      // Border light that follows the pointer on cards.
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element).closest<HTMLElement>("[data-spotlight]");
        if (!card) return;
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - box.left}px`);
        card.style.setProperty("--my", `${e.clientY - box.top}px`);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
        root.classList.remove("motion-ready");
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
