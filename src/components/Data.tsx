import { BrainCircuit, ChartColumn, DatabaseZap, Shuffle } from "lucide-react";
import { dataStages, dataTools } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const icons = [DatabaseZap, Shuffle, BrainCircuit, ChartColumn];

/** The data profile as a pipeline: four stages from raw source to dashboard. */
export function Data() {
  return (
    <section id="data" className="px-gutter relative py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 h-[30rem] w-[40rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              tag="Data engineering"
              title={
                <>
                  Des données brutes
                  <br />
                  <span className="text-gradient">aux décisions claires.</span>
                </>
              }
            />
          </div>
          <p className="max-w-[46ch] text-[1.08rem] leading-relaxed text-muted lg:col-span-5">
            Je construis la chaîne complète : collecter les données, les fiabiliser, en tirer des
            modèles et les restituer dans des tableaux de bord lisibles par toute l&apos;équipe.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dataStages.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.step} className="glass relative flex flex-col rounded-[24px] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-gradient-to-br from-accent/25 to-accent-2/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="tabular text-[13px] text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-[1.3rem] font-semibold tracking-[-0.02em]">{s.step}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                <p className="mt-auto pt-6 text-[13px] text-fg/70">{s.tools}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[13px] text-muted">Outils data</span>
          {dataTools.map((t) => (
            <span key={t} className="glass rounded-full px-3.5 py-1.5 text-[13px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
