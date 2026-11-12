import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import portrait from "@/assets/roland.webp";
import { ui, type Lang } from "@/i18n";
import { about, profile, services, stack } from "@/data/profile";
import { projects, tools } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { CopyEmail } from "./CopyEmail";
import { Reel } from "./Reel";
import reelPoster from "@/assets/motion/showreel-poster.jpg";

const marquee = ["Next.js", "React", "TypeScript", "Laravel", "Filament", "PHP", "Flutter", "Firebase", "Node.js", "Tailwind CSS", "SQL", "Python"];

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function SectionTitle({ id, children, intro }: { id: string; children: React.ReactNode; intro?: string }) {
  return (
    <div data-reveal className="mb-8 max-w-2xl sm:mb-10">
      <h2 id={id} className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
        {children}
      </h2>
      {intro && <p className="mt-3 text-[17px] leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      {/* Intro */}
      <section aria-labelledby="intro-title" className="px-gutter pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
          <div className="max-w-2xl">
            <p data-intro className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[14px] text-muted">
              <span aria-hidden className="h-2 w-2 rounded-full bg-leaf" />
              {ui.hero.status[lang]}
            </p>
            <h1
              id="intro-title"
              data-split
              className="mt-6 text-[clamp(2.2rem,6vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-balance"
            >
              {ui.hero.title[lang]}
            </h1>
            <p data-intro className="mt-6 max-w-xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
              {ui.hero.intro[lang]}
            </p>
            <div data-intro className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projets"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent transition-opacity hover:opacity-90"
              >
                {ui.hero.ctaWork[lang]}
                <ArrowDown aria-hidden className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-muted"
              >
                {ui.hero.ctaContact[lang]}
              </a>
            </div>
            <p data-intro className="mt-8 flex items-center gap-2 text-[14px] text-muted">
              <MapPin aria-hidden className="h-4 w-4" /> {profile.city}
            </p>
          </div>

          <div data-portrait className="skeleton relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-3xl sm:max-w-[280px] md:w-[300px] md:max-w-[300px] lg:w-[340px] lg:max-w-[340px]">
            <div data-parallax="7" className="absolute inset-x-0 -bottom-[7%] -top-[7%]">
              <Image
                src={portrait}
                alt={ui.hero.portrait[lang]}
                fill
                priority
                placeholder="blur"
                quality={70}
                sizes="(min-width: 1024px) 340px, 300px"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools strip */}
      <div aria-hidden className="overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-10 pr-10">
              {marquee.map((t) => (
                <li key={t} className="flex items-center gap-10 whitespace-nowrap text-lg font-medium text-muted">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Showreel */}
      <section aria-labelledby="reel-title" className="px-gutter pt-16 sm:pt-20">
        <div className="wrap">
          <h2 id="reel-title" data-reveal className="mb-6 text-xl font-semibold tracking-tight">
            {ui.reel.title[lang]}
          </h2>
          <div data-reveal>
            <Reel lang={lang} poster={reelPoster} />
          </div>
        </div>
      </section>

      {/* Client work */}
      <section aria-labelledby="projets" className="px-gutter scroll-mt-20 py-16 sm:py-20">
        <div className="wrap">
          <SectionTitle id="projets" intro={ui.work.intro[lang]}>
            {ui.work.title[lang]}
          </SectionTitle>
          <ul data-reveal className="grid gap-5 md:grid-cols-2">
            {featured.map((p, i) => (
              <li key={p.slug} className={`flex ${i === 0 ? "md:col-span-2" : ""}`}>
                <ProjectCard project={p} lang={lang} large wide={i === 0} priority={i < 1} />
              </li>
            ))}
          </ul>

          <h3 className="mb-6 mt-16 text-xl font-semibold tracking-tight">{ui.work.more[lang]}</h3>
          <ul data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug} className="flex">
                <ProjectCard project={p} lang={lang} />
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-16 text-xl font-semibold tracking-tight">{ui.work.tools[lang]}</h3>
          <ul data-reveal className="divide-y divide-line rounded-2xl border border-line">
            {tools.map((t) => (
              <li key={t.name}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-raised"
                >
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="mt-0.5 block text-[15px] text-muted">{t.note[lang]}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-[14px] text-muted group-hover:text-fg">
                    <span className="hidden sm:inline">{ui.work.source[lang]}</span>
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services and tools */}
      <section aria-labelledby="services" className="px-gutter scroll-mt-20 py-16 sm:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <SectionTitle id="services">{ui.services.title[lang]}</SectionTitle>
            <ul data-reveal className="grid gap-5 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.title.fr} data-spotlight className="rounded-2xl border border-line p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{s.title[lang]}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-xl font-semibold tracking-tight lg:mt-3">{ui.stack.title[lang]}</h2>
            <dl data-reveal className="space-y-4">
              {stack.map((s) => (
                <div key={s.group.fr} className="border-t border-line pt-3">
                  <dt className="text-[14px] text-muted">{s.group[lang]}</dt>
                  <dd className="mt-1 font-medium">{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="a-propos" className="px-gutter scroll-mt-20 py-16 sm:py-20">
        <div className="wrap max-w-3xl">
          <SectionTitle id="a-propos">{ui.about.title[lang]}</SectionTitle>
          <div data-reveal className="space-y-4 text-[17px] leading-relaxed text-muted">
            {about.text.map((t) => (
              <p key={t.fr}>{t[lang]}</p>
            ))}
          </div>
          <dl data-reveal className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {about.facts.map((f) => (
              <div key={f.label.fr} className="rounded-2xl border border-line px-5 py-4">
                <dt className="text-[14px] text-muted">{f.label[lang]}</dt>
                <dd className="mt-1 font-medium">{f.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="px-gutter scroll-mt-20 py-16 sm:py-24">
        <div data-reveal className="wrap rounded-3xl border border-line bg-raised px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 id="contact" className="text-[clamp(1.9rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-balance">
            {ui.contact.title[lang]}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-muted">{ui.contact.intro[lang]}</p>
          <p className="mt-6 break-all text-lg font-medium">{profile.email}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              <Mail aria-hidden className="h-4 w-4" />
              {ui.contact.email[lang]}
            </a>
            <CopyEmail email={profile.email} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
