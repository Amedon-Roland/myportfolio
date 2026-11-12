import type { ReactNode } from "react";
import type { Lang } from "@/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RoliGuide } from "./RoliGuide";
import { BackToTop } from "./BackToTop";

/** Header, main landmark and footer around a page; `altHref` is the same page in the other language. */
export function Frame({ lang, altHref, children }: { lang: Lang; altHref: string; children: ReactNode }) {
  return (
    <>
      <Header lang={lang} altHref={altHref} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer lang={lang} />
      <RoliGuide lang={lang} />
      <BackToTop lang={lang} />
    </>
  );
}
