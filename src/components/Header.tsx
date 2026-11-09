import Link from "next/link";
import { homePath, ui, type Lang } from "@/i18n";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  lang: Lang;
  /** The same page in the other language. */
  altHref: string;
};

export function Header({ lang, altHref }: Props) {
  const home = homePath(lang);
  const other: Lang = lang === "fr" ? "en" : "fr";
  const links = [
    { href: `${home}#projets`, label: ui.nav.work[lang] },
    { href: `${home}#services`, label: ui.nav.services[lang] },
    { href: `${home}#a-propos`, label: ui.nav.about[lang] },
  ];

  return (
    <header className="px-gutter sticky top-0 z-40 border-b border-line bg-ground/95">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href={home} className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={ui.nav.home[lang]}>
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[12px] font-bold text-on-accent">
            RA
          </span>
          <span className="hidden sm:inline">Roland Amedon</span>
        </Link>

        <nav aria-label={ui.nav.label[lang]} className="hidden md:block">
          <ul className="flex items-center gap-1 text-[15px]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3.5 py-2.5 text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={altHref}
            hrefLang={other}
            lang={other}
            aria-label={other === "en" ? "English version" : "Version française"}
            className="grid h-11 min-w-11 place-items-center rounded-full px-2 text-[14px] font-semibold text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            {other.toUpperCase()}
          </Link>
          <ThemeToggle lang={lang} />
          <a
            href={`${home}#contact`}
            className="ml-1 inline-flex h-10 items-center rounded-full bg-fg px-4 text-[14px] font-medium text-ground transition-opacity hover:opacity-85"
          >
            {ui.nav.contact[lang]}
          </a>
        </div>
      </div>
    </header>
  );
}
