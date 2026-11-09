import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { ui, type Lang } from "@/i18n";
import { Motion } from "./Motion";
import "@/app/globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/*
  Runs before the first paint:
  - applies the saved theme (dark is the default);
  - sorts the visitor into one of two experiences:
    `lite` (data saver, 2G/3G, little memory, or reduced motion): the static
    page, no animation library is ever downloaded;
    `motion` (everything else): GSAP and Lenis load and animate the page.
    If they have not started within 3 s the page falls back to static.
*/
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}var lite=false;try{var c=navigator.connection;if(c&&(c.saveData||/2g|3g/.test(c.effectiveType||"")))lite=true;if(navigator.deviceMemory&&navigator.deviceMemory<2)lite=true;if(matchMedia("(prefers-reduced-motion: reduce)").matches)lite=true}catch(e){}d.classList.add(lite?"lite":"motion");if(!lite)setTimeout(function(){if(!window.__motionReady)d.classList.remove("motion")},3000)})()`;

/** The <html> shell shared by the French and English root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={geist.variable} suppressHydrationWarning>
      {/* Root layouts render their own <head>; this file is only used by them. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body id="top" className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 font-medium text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {ui.skip[lang]}
        </a>
        {children}
        <Motion />
      </body>
    </html>
  );
}
