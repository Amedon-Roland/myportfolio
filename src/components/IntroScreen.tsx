import { profile } from "@/data/profile";
import type { Lang } from "@/i18n";

/**
 * Opening screen, played on every full page load, only in the motion
 * experience (the boot script in RootShell adds `intro-on` to <html>).
 * It is pure CSS: it runs before any JavaScript loads and always ends on its
 * own, so it can never block the page. Decorative, hence hidden from
 * assistive technology.
 */
export function IntroScreen({ lang }: { lang: Lang }) {
  const letters = profile.name.split("");
  return (
    <div aria-hidden className="intro-screen">
      <div className="intro-panel intro-panel-accent" />
      <div className="intro-panel intro-panel-ground">
        <div className="intro-content">
          <svg className="intro-mark" viewBox="0 0 120 120" width="120" height="120">
            <circle className="intro-ring" cx="60" cy="60" r="56" pathLength="1" />
            <text x="60" y="60" dominantBaseline="central" textAnchor="middle">
              RA
            </text>
          </svg>
          <p className="intro-name">
            {letters.map((ch, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p className="intro-role">
            {profile.role[lang]} · {profile.city}
          </p>
          <div className="intro-progress">
            <span className="intro-bar" />
            <span className="intro-count" />
          </div>
        </div>
      </div>
    </div>
  );
}
