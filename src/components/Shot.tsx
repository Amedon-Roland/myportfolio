import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Crop to a fixed ratio from the top; otherwise the image keeps its own ratio. */
  ratio?: string;
  /** Tailwind aspect classes, for a ratio that changes with the screen size (overrides `ratio`). */
  ratioClass?: string;
  /** Drift, in percent, against the scroll (animated only on capable connections). */
  parallax?: number;
};

/**
 * A screenshot that never jumps: its box is reserved from the image's own
 * dimensions, a shimmering skeleton fills it, then a blurred preview, then
 * the real image in the smallest format the browser accepts. With
 * `parallax`, the image is slightly taller than its frame so it can drift.
 */
export function Shot({ src, alt, sizes, priority, className = "", ratio, ratioClass, parallax }: Props) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      placeholder="blur"
      priority={priority}
      quality={70}
      className="object-cover object-top"
    />
  );

  return (
    <div
      className={`skeleton relative overflow-hidden ${ratioClass ?? ""} ${className}`}
      style={ratioClass ? undefined : { aspectRatio: ratio ?? `${src.width} / ${src.height}` }}
    >
      {parallax ? (
        <div data-parallax={parallax} className="absolute inset-x-0" style={{ top: `-${parallax}%`, bottom: `-${parallax}%` }}>
          {image}
        </div>
      ) : (
        image
      )}
    </div>
  );
}
