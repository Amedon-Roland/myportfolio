import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { projectPath, homePath, ui, type Lang } from "@/i18n";
import { projects, type Project } from "@/data/projects";
import { Shot } from "./Shot";

export function ProjectPage({ project: p, lang }: { project: Project; lang: Lang }) {
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="px-gutter pb-20 pt-8 sm:pt-12">
      <div className="wrap">
        <Link
          href={`${homePath(lang)}#projets`}
          className="inline-flex h-11 items-center gap-2 rounded-full pr-3 text-[15px] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          {ui.project.back[lang]}
        </Link>

        <header className="mt-6 max-w-3xl">
          <h1 className="text-[clamp(2.2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{p.name}</h1>
          <p className="mt-4 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">{p.summary[lang]}</p>
        </header>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-ground px-5 py-4">
            <dt className="text-[14px] text-muted">{ui.project.client[lang]}</dt>
            <dd className="mt-1 font-medium">{p.client[lang]}</dd>
          </div>
          <div className="bg-ground px-5 py-4">
            <dt className="text-[14px] text-muted">{ui.project.year[lang]}</dt>
            <dd className="mt-1 font-medium">{p.year}</dd>
          </div>
          <div className="bg-ground px-5 py-4">
            <dt className="text-[14px] text-muted">{ui.project.stack[lang]}</dt>
            <dd className="mt-1 font-medium">{p.stack.join(", ")}</dd>
          </div>
          <div className="bg-ground px-5 py-4">
            <dt className="text-[14px] text-muted">{ui.project.links[lang]}</dt>
            <dd className="mt-1 space-y-1">
              {p.links.map((l) =>
                l.href ? (
                  <a
                    key={l.label.fr}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 break-all font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {l.label[lang]}
                    <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0" />
                  </a>
                ) : (
                  <span key={l.label.fr} className="flex items-center gap-1.5 font-medium">
                    <Lock aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted" />
                    {l.label[lang]}
                  </span>
                ),
              )}
            </dd>
          </div>
        </dl>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-line">
          <Shot src={p.cover.src} alt={p.cover.alt[lang]} priority sizes="(min-width: 1152px) 1152px, 100vw" />
        </figure>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          <section aria-labelledby="need">
            <h2 id="need" className="text-xl font-semibold tracking-tight">
              {ui.project.need[lang]}
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-muted">{p.need[lang]}</p>
          </section>
          <section aria-labelledby="built">
            <h2 id="built" className="text-xl font-semibold tracking-tight">
              {ui.project.built[lang]}
            </h2>
            <ul className="mt-3 space-y-2.5 text-[17px] leading-relaxed text-muted">
              {p.built[lang].map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {(p.gallery.length > 0 || p.mobile) && (
          <section aria-labelledby="gallery" className="mt-16">
            <h2 id="gallery" className="text-xl font-semibold tracking-tight">
              {ui.project.gallery[lang]}
            </h2>
            <div className={`mt-6 grid items-start gap-5 ${p.mobile ? "md:grid-cols-[1fr_16rem]" : ""}`}>
              <ul className="grid gap-5">
                {p.gallery.map((g) => (
                  <li key={g.alt.fr}>
                    <figure className="overflow-hidden rounded-2xl border border-line">
                      {/* The caption below names the image, so the image itself stays silent. */}
                      <Shot src={g.src} alt="" sizes="(min-width: 1152px) 860px, 100vw" />
                      <figcaption className="border-t border-line px-4 py-3 text-[14px] text-muted">{g.alt[lang]}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              {p.mobile && (
                <figure className="mx-auto w-full max-w-[16rem] md:sticky md:top-24">
                  <div className="overflow-hidden rounded-[2rem] border-[6px] border-raised ring-1 ring-line">
                    <Shot src={p.mobile.src} alt="" ratio="390 / 800" sizes="256px" />
                  </div>
                  <figcaption className="mt-3 text-center text-[14px] text-muted">{p.mobile.alt[lang]}</figcaption>
                </figure>
              )}
            </div>
          </section>
        )}

        <nav aria-label={ui.project.next[lang]} className="mt-16 border-t border-line pt-8">
          <Link
            href={projectPath(lang, next.slug)}
            className="group inline-flex flex-col gap-1 rounded-xl py-2 pr-2"
          >
            <span className="text-[14px] text-muted">{ui.project.next[lang]}</span>
            <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              {next.name}
              <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
