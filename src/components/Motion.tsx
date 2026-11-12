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
 * GSAP and Lenis are set up once for the whole visit. Pages arrive in pieces
 * (client navigation, streamed content, the language switch), so instead of
 * animating "the page" once, a MutationObserver picks up every hooked element
 * as soon as it is in the DOM and animates it exactly once (`data-m`).
 *
 * Markup hooks:
 *   data-split        headline revealed word by word
 *   data-intro        hero elements that rise in after the headline
 *   data-portrait     hero portrait, unveiled from the bottom
 *   data-reveal       container whose children rise in when scrolled into view
 *   data-parallax=N   element drifting N% against the scroll inside its frame
 *   data-drift=N      decorative layer moving N px up/down while its section crosses the screen
 *   data-drift-x=N    decorative layer sliding N% sideways (giant background words)
 *   data-spotlight    card whose border lights up under the pointer
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    let cancelled = false;
    let cleanup = () => {};

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

      /** Elements matching `selector` that have not been animated yet; marks them. */
      let added = 0;
      const fresh = (selector: string) => {
        const found = [...document.querySelectorAll<HTMLElement>(`${selector}:not([data-m])`)];
        found.forEach((el) => el.setAttribute("data-m", ""));
        added += found.length;
        return found;
      };

      const scan = () => {
        added = 0;
        // Triggers whose element left the page (previous route) are dropped.
        ScrollTrigger.getAll().forEach((t) => {
          const el = t.trigger as Element | undefined;
          if (el && !el.isConnected) t.kill();
        });

        // Hero: words rise out of their line, then the rest follows. On the
        // first page of a visit, wait for the opening screen to lift.
        const headlines = fresh("[data-split]");
        const intro = fresh("[data-intro]");
        const portraits = fresh("[data-portrait]");
        if (headlines.length || intro.length || portraits.length) {
          const delay =
            root.classList.contains("intro-on") && window.__introAt !== undefined
              ? Math.max(0, 1.2 - (performance.now() - window.__introAt) / 1000)
              : 0;
          const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay });
          headlines.forEach((h) => {
            const split = SplitText.create(h, { type: "words", mask: "words" });
            tl.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.05 }, 0.1);
          });
          if (intro.length) tl.from(intro, { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, headlines.length ? 0.45 : 0.05);
          portraits.forEach((p) => {
            tl.from(p, { clipPath: "inset(100% 0% 0% 0% round 24px)", duration: 1.4, ease: "expo.inOut" }, 0.15);
            const img = p.querySelector("img");
            if (img) tl.from(img, { scale: 1.25, duration: 1.8 }, 0.15);
          });
        }

        // Content rises in as it scrolls into view.
        fresh("[data-reveal]").forEach((group) => {
          if (!group.children.length) return;
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
        fresh("[data-parallax]").forEach((layer) => {
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

        // Decorative layers: depth by speed difference, tied to their section.
        fresh("[data-drift]").forEach((layer) => {
          const amount = Number(layer.dataset.drift) || 60;
          const section = layer.closest("section") ?? layer.parentElement;
          gsap.fromTo(
            layer,
            { y: -amount },
            { y: amount, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        fresh("[data-drift-x]").forEach((layer) => {
          const amount = Number(layer.dataset.driftX) || 12;
          const section = layer.closest("section") ?? layer.parentElement;
          gsap.fromTo(
            layer,
            { xPercent: amount },
            { xPercent: -amount, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        if (added) ScrollTrigger.refresh();
      };

      // Batch DOM changes into one scan per frame.
      let queued = 0;
      const queue = () => {
        if (!queued) queued = requestAnimationFrame(() => ((queued = 0), scan()));
      };
      const observer = new MutationObserver(queue);
      observer.observe(document.body, { childList: true, subtree: true });
      scan();
      root.classList.add("motion-ready");

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
        observer.disconnect();
        cancelAnimationFrame(queued);
        window.removeEventListener("pointermove", onMove);
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.ticker.remove(raf);
        lenis.destroy();
        root.classList.remove("motion-ready");
      };
      (window as Window & { __lenis?: InstanceType<typeof Lenis> }).__lenis = lenis;
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // After a route change, Lenis must forget the old page's position: start
  // at the top, or at the anchor the link pointed to.
  useEffect(() => {
    const lenis = (
      window as Window & {
        __lenis?: { resize: () => void; scrollTo: (target: number | string, o?: object) => void };
      }
    ).__lenis;
    if (!lenis) return;
    lenis.resize();
    const hash = decodeURIComponent(location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (target) lenis.scrollTo(target as unknown as string, { immediate: true, force: true, offset: -72 });
    else lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
