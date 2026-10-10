import { OptimizedImage } from "@/components/media";
import type { HomepageSection } from "@/content/about";

interface ContentSectionProps {
  section: HomepageSection;
  /** Places the image on the left instead of the right. */
  reversed?: boolean;
}

/**
 * A text-and-image section, used for "¿Quién soy?" and "¿Qué hago?".
 *
 * REQ-SEO-003 and REQ-SEO-004: each section is a `<section>` labelled by its
 * heading, so the document keeps a logical landmark and heading structure.
 * REQ-RESP-002 and REQ-RESP-003: the layout stacks on small screens and places
 * the image beside the text from the `md` breakpoint up, on whichever side
 * `reversed` selects.
 * REQ-MEDIA-002: `sizes` tells the browser the image occupies roughly half the
 * viewport on wide screens and full width on narrow ones.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function ContentSection({ section, reversed = false }: ContentSectionProps) {
  const { id, eyebrow, heading, body, image } = section;
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-12 md:py-24"
    >
      <div className={reversed ? "md:order-2" : undefined}>
        <p className="text-sm uppercase tracking-widest text-brand-pink">
          {eyebrow}
        </p>
        <h2 id={headingId} className="mt-2 font-display text-4xl sm:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-prose">{body}</p>
      </div>

      <OptimizedImage
        {...image}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`aspect-4/5 w-full bg-brand-black ${reversed ? "md:order-1" : ""}`}
      />
    </section>
  );
}