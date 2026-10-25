import { craft, method } from "@/data/site";

/**
 * The four steps sit side by side like sewn kente strips: equal widths,
 * alternating shades, one continuous cloth.
 */
export function Method() {
  return (
    <section id="methode" className="px-gutter pb-32 pt-28 md:pt-40">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <h2 className="display-tight text-[clamp(3.6rem,11vw,10rem)] md:col-span-7">
          Une bande
          <br />
          à la fois
        </h2>
        <p className="max-w-[40ch] text-xl leading-relaxed text-cotton/80 md:col-span-5 md:col-start-8 md:justify-self-end">
          À Kpetoe, au Togo, le kente se tisse en bandes étroites que l&apos;on coud ensuite bord à
          bord. Je construis mes projets de la même manière.
        </p>
      </div>

      <ol className="mt-16 grid overflow-hidden rounded-sm md:mt-20 md:grid-cols-4">
        {method.map((m, i) => (
          <li
            key={m.title}
            className={`flex flex-col gap-20 p-7 md:gap-28 md:p-8 md:pb-12 ${
              i % 2 ? "bg-indigo-line/55" : "bg-indigo"
            }`}
          >
            <span className="font-display tabular text-[15px] text-gold">Étape {i + 1}</span>
            <div>
              <h3 className="font-display text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.02em]">
                {m.title}
              </h3>
              <p className="mt-5 text-[1.12rem] leading-[1.55] text-cotton/80">{m.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-28 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight">Mes outils</h3>
          <p className="mt-3 max-w-[30ch] text-lg text-cotton/70">
            Ceux que j&apos;utilise en production, pas ceux que j&apos;ai seulement essayés.
          </p>
        </div>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:col-span-8">
          {craft.map((c) => (
            <div key={c.group} className="border-t border-indigo-line pt-4">
              <dt className="font-display text-[15px] text-haze">{c.group}</dt>
              <dd className="font-display mt-2 text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.01em]">
                {c.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
