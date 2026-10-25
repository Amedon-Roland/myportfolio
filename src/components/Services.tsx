"use client";

import { Database, Globe, Server, Smartphone } from "lucide-react";
import { services } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const icons = { data: Database, web: Globe, mobile: Smartphone, server: Server };

function spotlight(e: React.PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export function Services() {
  return (
    <section id="services" className="px-gutter relative py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          tag="Services"
          align="center"
          title="De la donnée à la mise en ligne"
          intro="Un seul interlocuteur pour la data, le web, le mobile et le back-office. Moins d'allers-retours, un produit cohérent."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.title}
                onPointerMove={spotlight}
                className="spotlight glass group flex flex-col gap-10 rounded-[28px] p-7 md:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-gradient-to-br from-accent/25 to-accent-2/10 text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.45rem] font-semibold tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-3 max-w-[44ch] leading-relaxed text-muted">{s.text}</p>
                  <p className="mt-6 text-[13px] text-fg/60">{s.tools}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
