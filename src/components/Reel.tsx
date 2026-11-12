"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Pause, Play } from "lucide-react";
import { ui, type Lang } from "@/i18n";

type Props = { lang: Lang; poster: StaticImageData };

/**
 * The showreel, rendered from an HTML composition with HyperFrames (motion/ holds the source).
 *
 * Everyone gets the poster image. The video itself is only attached in the
 * motion experience, once the reel is about to scroll into view, so slow
 * connections never download it. It plays while visible, muted and looping,
 * and can be paused at any time.
 */
export function Reel({ lang, poster }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  // Attach the video when the reel comes near the viewport.
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion") || !frame.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(frame.current);
    return () => io.disconnect();
  }, []);

  // Play only while on screen.
  useEffect(() => {
    const el = video.current;
    if (!enabled || !el || !frame.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(frame.current);
    return () => io.disconnect();
  }, [enabled]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <figure>
      <div
        ref={frame}
        className="skeleton relative overflow-hidden rounded-2xl border border-line sm:rounded-3xl"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src={poster}
          alt={ui.reel.label[lang]}
          fill
          placeholder="blur"
          quality={70}
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
        {enabled && (
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
          >
            <source src="/motion/showreel.mp4" type="video/mp4" />
          </video>
        )}
        {enabled && (
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? ui.reel.play[lang] : ui.reel.pause[lang]}
            className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-ground/80 text-fg ring-1 ring-line transition-colors hover:bg-ground sm:bottom-4 sm:right-4"
          >
            {paused ? <Play aria-hidden className="h-4 w-4" /> : <Pause aria-hidden className="h-4 w-4" />}
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-[14px] text-muted">{ui.reel.note[lang]}</figcaption>
    </figure>
  );
}
