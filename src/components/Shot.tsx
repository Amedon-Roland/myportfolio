import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Crop to a fixed ratio from the top; otherwise the image keeps its own ratio. */
  ratio?: string;
};

/**
 * A screenshot that never jumps: its box is reserved from the image's own
 * dimensions, a shimmering skeleton fills it, then a blurred preview, then
 * the real image in the smallest format the browser accepts.
 */
export function Shot({ src, alt, sizes, priority, className = "", ratio }: Props) {
  return (
    <div
      className={`skeleton relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio ?? `${src.width} / ${src.height}` }}
    >
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
    </div>
  );
}
