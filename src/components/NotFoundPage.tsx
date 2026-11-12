import Link from "next/link";
import { homePath, ui, type Lang } from "@/i18n";
import { Roli } from "./Roli";

export function NotFoundPage({ lang }: { lang: Lang }) {
  return (
    <div className="px-gutter py-24 sm:py-32">
      <div className="wrap max-w-xl text-center">
        <Roli mood="think" className="mx-auto mb-6 h-28 w-28" />
        <p className="text-[14px] font-medium text-muted">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{ui.notFound.title[lang]}</h1>
        <p className="mt-4 text-[17px] text-muted">{ui.notFound.text[lang]}</p>
        <Link
          href={homePath(lang)}
          className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-on-accent"
        >
          {ui.notFound.back[lang]}
        </Link>
      </div>
    </div>
  );
}
