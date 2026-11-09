/** Shown while a project page streams in: same layout, grey blocks. */
export function ProjectSkeleton({ label }: { label: string }) {
  return (
    <div className="px-gutter pb-20 pt-8 sm:pt-12" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="wrap" aria-hidden>
        <div className="skeleton h-5 w-36 rounded-full" />
        <div className="skeleton mt-8 h-12 w-2/3 max-w-lg rounded-xl" />
        <div className="skeleton mt-4 h-5 w-full max-w-2xl rounded-lg" />
        <div className="skeleton mt-2 h-5 w-4/5 max-w-xl rounded-lg" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
        <div className="skeleton mt-8 aspect-[16/10] w-full rounded-2xl" />
      </div>
    </div>
  );
}
