import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { ui, type Lang } from "@/i18n";
import "@/app/globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/*
  Runs before the first paint:
  - applies the saved theme (dark is the default);
  - flags slow or data-saving connections with a `lite` class, which turns
    off motion and decorative extras.
*/
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}try{var c=navigator.connection;if(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||"")))d.classList.add("lite")}catch(e){}})()`;

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
      </body>
    </html>
  );
}
