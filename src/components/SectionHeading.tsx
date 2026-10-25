import type { ReactNode } from "react";

type Props = {
  tag: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ tag, title, intro, align = "left" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-fg/75">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {tag}
      </span>
      <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-[52ch] text-[1.08rem] leading-relaxed text-muted ${center ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
