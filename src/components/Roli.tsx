type Mood = "idle" | "wave" | "think";

type Props = {
  mood?: Mood;
  className?: string;
};

/**
 * ROLI, the site's mascot: a small screen-faced robot with a leaf antenna.
 * Pure SVG, coloured from the theme tokens. Its blinking, floating and waving
 * are CSS animations that only run in the motion experience (see globals.css).
 * The pupils follow `--look-x` / `--look-y` when a parent sets them.
 * Decorative: whatever Roli "says" is written next to it as real text.
 */
export function Roli({ mood = "idle", className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 132" className={`roli roli-${mood} ${className}`} aria-hidden focusable="false">
      {/* Shadow on the ground */}
      <ellipse className="roli-shadow" cx="60" cy="126" rx="26" ry="4" />

      <g className="roli-body">
        {/* Antenna */}
        <g className="roli-antenna">
          <path d="M60 20 V8" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 9 C 52 2, 66 -2, 70 4 C 66 10, 60 10, 60 9 Z" fill="var(--color-leaf)" />
        </g>

        {/* Arms */}
        <path className="roli-arm-left" d="M18 72 C 6 74, 6 88, 14 92" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path className="roli-arm-right" d="M102 72 C 114 66, 116 54, 110 46" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" fill="none" />

        {/* Head and screen */}
        <rect x="16" y="20" width="88" height="80" rx="30" fill="var(--color-accent)" />
        <rect x="26" y="31" width="68" height="54" rx="20" fill="#0d0f16" />
        <rect x="26" y="31" width="68" height="54" rx="20" fill="url(#roli-sheen)" />

        {/* Eyes */}
        <g className="roli-eyes">
          <rect className="roli-eye" x="42" y="47" width="10" height="16" rx="5" fill="#e8ecff" />
          <rect className="roli-eye" x="68" y="47" width="10" height="16" rx="5" fill="#e8ecff" />
        </g>
        {/* Mouth */}
        <path className="roli-mouth" d="M53 72 Q 60 77 67 72" stroke="#e8ecff" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Cheeks */}
        <circle cx="36" cy="70" r="3.5" fill="#ff8fa3" opacity="0.55" />
        <circle cx="84" cy="70" r="3.5" fill="#ff8fa3" opacity="0.55" />

        {/* Little feet */}
        <rect x="38" y="100" width="14" height="12" rx="6" fill="var(--color-accent)" />
        <rect x="68" y="100" width="14" height="12" rx="6" fill="var(--color-accent)" />
      </g>

      <defs>
        <linearGradient id="roli-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
