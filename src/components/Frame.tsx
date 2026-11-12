import { ViewTransition, type ReactNode } from "react";
import type { Lang } from "@/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Directional slides for links tagged nav-forward / nav-back, a soft rise otherwise. */
const enter = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-in" };
const exit = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-out" };

/**
 * Header, main landmark and footer around a page; `altHref` is the same page
 * in the other language. On client navigation the header stays still while
 * the page content leaves and the next one arrives (React <ViewTransition>).
 */
export function Frame({ lang, altHref, children }: { lang: Lang; altHref: string; children: ReactNode }) {
  return (
    <>
      <ViewTransition name="site-header">
        <Header lang={lang} altHref={altHref} />
      </ViewTransition>
      <ViewTransition enter={enter} exit={exit} default="none">
        <div>
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer lang={lang} />
        </div>
      </ViewTransition>
    </>
  )
}
