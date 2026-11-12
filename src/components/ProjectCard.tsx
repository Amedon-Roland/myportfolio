import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectPath, ui, type Lang } from "@/i18n";
import type { Project } from "@/data/projects";
import { Shot } from "./Shot";

type Props = {
  project: Project;
  lang: Lang;
  large?: boolean;
  /** Spans the whole row on larger screens, with a wider image. */
  wide?: boolean;
  priority?: boolean;
};

/** The whole card is one link; the image is decorative because the text names the project. */
export function ProjectCard({ project: p, lang, large, wide, priority }: Props) {
  return (
    <article data-spotlight className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-raised transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-muted/50">
      <Shot
        src={p.cover.src}
        alt=""
        ratio="16 / 10"
        ratioClass={wide ? "aspect-[16/10] md:aspect-[21/9]" : undefined}
        parallax={6}
        priority={priority}
        sizes={wide ? "(min-width: 1152px) 1152px, 100vw" : large ? "(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1152px) 370px, (min-width: 768px) 33vw, 100vw"}
        className="border-b border-line"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {p.wip && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[12px] font-semibold text-accent">{ui.project.wip[lang]}</span>
          )}
          {p.parts.map((part) => (
            <span key={part.fr} className="rounded-full bg-ground px-2.5 py-1 text-[12px] font-medium text-muted">
              {part[lang]}
            </span>
          ))}
        </div>
        <h3 className={`${large ? "text-2xl" : "text-xl"} font-semibold tracking-tight`}>
          <Link href={projectPath(lang, p.slug)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <p className="text-[15px] leading-relaxed text-muted">{p.summary[lang]}</p>
        <span className="mt-auto flex items-center gap-1 pt-2 text-[14px] font-medium text-accent">
          {ui.work.open[lang]}
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      {/* Focus ring for the stretched link, drawn on the card itself. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-accent group-has-[:focus-visible]:ring-2" />
    </article>
  );
}
