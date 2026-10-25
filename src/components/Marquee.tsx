const items = [
  "Python",
  "Pandas",
  "SQL",
  "Scikit-learn",
  "Power BI",
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Dart",
  "Laravel",
  "PHP",
  "Node.js",
  "MongoDB",
  "Redis",
  "Tailwind CSS",
  "NumPy",
  "Tableau",
  "Mobile Money",
];

/** Tools in production, scrolling past in a strip that fades at both edges. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-12 whitespace-nowrap text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium tracking-tight text-fg/45">
          {t}
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Technologies utilisées" className="relative border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
