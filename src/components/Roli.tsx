export type RoliMood = "idle" | "wave" | "think" | "happy" | "sleep" | "dizzy" | "wow";

type Props = {
  mood?: RoliMood;
  className?: string;
};

const EYE = "#e8ecff";

/**
 * ROLI, the site's mascot: a small screen-faced robot with a leaf antenna.
 * Pure SVG, coloured from the theme tokens. Each mood shows its own eyes and
 * mouth (see `.roli-<mood>` in globals.css); blinking, floating and waving
 * only run in the motion experience. The pupils follow `--look-x` / `--look-y`.
 * Decorative: whatever Roli "says" is written next to it as real text.
 */
export function Roli({ mood = "idle", className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 132" className={`roli roli-${mood} ${className}`} aria-hidden focusable="false">
      <ellipse className="roli-shadow" cx="60" cy="126" rx="26" ry="4" />

      <g className="roli-body">
        <g className="roli-antenna">
          <path d="M60 20 V8" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
          <path className="roli-leaf" d="M60 9 C 52 2, 66 -2, 70 4 C 66 10, 60 10, 60 9 Z" fill="var(--color-leaf)" />
        </g>

        <path className="roli-arm-left" d="M18 72 C 6 74, 6 88, 14 92" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path className="roli-arm-right" d="M102 72 C 114 66, 116 54, 110 46" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" fill="none" />

        <rect x="16" y="20" width="88" height="80" rx="30" fill="var(--color-accent)" />
        <rect x="26" y="31" width="68" height="54" rx="20" fill="#0d0f16" />
        <path d="M46 31 H74 C 60 36, 40 44, 30 62 C 27 56, 26 50, 26 47 C 26 38, 35 31, 46 31 Z" fill="#ffffff" opacity="0.07" />

        {/* Eyes, one set per expression */}
        <g className="roli-eyes">
          <g className="roli-f roli-f-open">
            <rect className="roli-eye" x="42" y="47" width="10" height="16" rx="5" fill={EYE} />
            <rect className="roli-eye" x="68" y="47" width="10" height="16" rx="5" fill={EYE} />
          </g>
          <g className="roli-f roli-f-happy" stroke={EYE} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M40 58 Q 47 49 54 58" />
            <path d="M66 58 Q 73 49 80 58" />
          </g>
          <g className="roli-f roli-f-closed" stroke={EYE} strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M40 56 Q 47 61 54 56" />
            <path d="M66 56 Q 73 61 80 56" />
          </g>
          <g className="roli-f roli-f-dizzy" stroke={EYE} strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M41 49 L 53 61 M53 49 L 41 61" />
            <path d="M67 49 L 79 61 M79 49 L 67 61" />
          </g>
          <g className="roli-f roli-f-wow" fill={EYE}>
            <circle cx="47" cy="55" r="8" />
            <circle cx="73" cy="55" r="8" />
            <circle cx="49" cy="53" r="2.5" fill="#0d0f16" />
            <circle cx="75" cy="53" r="2.5" fill="#0d0f16" />
          </g>
        </g>

        {/* Mouths */}
        <path className="roli-f roli-m-smile" d="M53 72 Q 60 77 67 72" stroke={EYE} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path className="roli-f roli-m-grin" d="M51 70 Q 60 81 69 70 Z" fill={EYE} />
        <path className="roli-f roli-m-flat" d="M54 74 L 66 72" stroke={EYE} strokeWidth="3" strokeLinecap="round" />
        <ellipse className="roli-f roli-m-o" cx="60" cy="74" rx="4" ry="5" fill={EYE} />

        <circle cx="36" cy="70" r="3.5" fill="#ff8fa3" className="roli-cheek" />
        <circle cx="84" cy="70" r="3.5" fill="#ff8fa3" className="roli-cheek" />

        <rect className="roli-foot-l" x="38" y="100" width="14" height="12" rx="6" fill="var(--color-accent)" />
        <rect className="roli-foot-r" x="68" y="100" width="14" height="12" rx="6" fill="var(--color-accent)" />
      </g>

      {/* Extras: sleeping Zs and a heart */}
      <g className="roli-zz" fill="var(--color-muted)" fontWeight="700" fontFamily="var(--font-sans)">
        <text x="100" y="22" fontSize="14">z</text>
        <text x="108" y="10" fontSize="10">z</text>
      </g>
      <path className="roli-heart" d="M100 26 C 100 20, 108 20, 108 26 C 108 31, 100 35, 100 38 C 100 35, 92 31, 92 26 C 92 20, 100 20, 100 26 Z" fill="#ff6b8a" />

    </svg>
  );
}
