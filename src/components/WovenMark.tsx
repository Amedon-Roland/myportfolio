/** Monogram: three warp strips crossed by one weft thread. */
export function WovenMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="5.5" height="20" fill="currentColor" />
      <rect x="9.25" y="2" width="5.5" height="20" fill="currentColor" opacity="0.55" />
      <rect x="16.5" y="2" width="5.5" height="20" fill="currentColor" />
      <rect x="0" y="13" width="24" height="2" fill="var(--color-accent)" />
    </svg>
  );
}
