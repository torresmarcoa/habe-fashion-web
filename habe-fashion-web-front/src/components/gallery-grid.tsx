import Link from "next/link";

import { OptimizedImage } from "@/components/media";
import { designCategories } from "@/content/categories";
import type { GalleryItem } from "@/types/content";

interface GalleryGridProps {
  items: GalleryItem[];
  /** Heading level for each card, so the page keeps a valid hierarchy. */
  headingLevel?: 2 | 3;
}

/**
 * Responsive grid of gallery items (REQ-GALLERY-001, REQ-GALLERY-003).
 *
 * REQ-GALLERY-004 and REQ-A11Y-005: every item renders the alternative text
 * declared in content, never a generic placeholder string.
 * REQ-MEDIA-002: `sizes` reflects the grid columns at each breakpoint so the
 * browser downloads an appropriately sized candidate.
 * REQ-PERF-003: every tile reserves its aspect ratio before the image loads,
 * so there is no layout shift.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function GalleryGrid({ items, headingLevel = 3 }: GalleryGridProps) {
  if (items.length === 0) {
    return null;
  }

  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-2">
          <OptimizedImage
            publicId={item.media.publicId}
            src={item.media.src}
            width={item.media.width}
            height={item.media.height}
            alt={item.alt}
            sizes="(min-width: 768px) 33vw, 50vw"
            className="aspect-4/5 w-full bg-brand-black"
          />
          <Heading className="font-display text-lg">{item.title}</Heading>
        </li>
      ))}
    </ul>
  );
}

interface GalleryPageBodyProps {
  title: string;
  description?: string;
  items: GalleryItem[];
  headingLevel?: 2 | 3;
}

/**
 * Shared gallery page body used by the index and by each category route.
 *
 * Extracted because both routes render identical structure, which keeps the
 * alternative text and image handling identical across the gallery
 * (REQ-GALLERY-004).
 */
export function GalleryPageBody({
  title,
  description,
  items,
  headingLevel = 2,
}: GalleryPageBodyProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h1 className="font-display text-4xl text-brand-pink sm:text-5xl">
        {title}
      </h1>
      {description ? <p className="mt-4 max-w-prose">{description}</p> : null}

      {items.length === 0 ? (
        <p className="mt-10 max-w-prose">
          Todavía no hay piezas en esta categoría.
        </p>
      ) : (
        <div className="mt-10">
          <GalleryGrid items={items} headingLevel={headingLevel} />
        </div>
      )}
    </div>
  );
}

/**
 * Links to each category route (REQ-SHOWCASE-002, REQ-SEO-008).
 *
 * Rendered from `designCategories`, so a new category appears here without a
 * change elsewhere (REQ-SHOWCASE-002).
 */
export function CategoryLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {designCategories.map((category) => (
        <li key={category.id}>
          <Link href={`/galeria/${category.slug}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
}