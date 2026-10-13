import Link from "next/link";

import { GalleryGrid } from "@/components/gallery-grid";
import { designCategories } from "@/content/categories";
import { galleryItems, homeTeaserLimit } from "@/content/gallery";

/**
 * Homepage gallery teaser.
 *
 * REQ-SHOWCASE-001 requires the homepage to provide a way to showcase the
 * designer's work across categories. The full gallery lives at `/galeria`;
 * this shows a small sample and links onward, so the requirement is met on
 * the homepage without duplicating the whole gallery.
 * REQ-SHOWCASE-002: adding a category adds its link here automatically,
 * because both the teaser and the links read from `designCategories`.
 */
export function HomeGallery() {
  const teaser = galleryItems.slice(0, homeTeaserLimit);

  return (
    <section
      aria-labelledby="galeria-teaser-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:py-24"
    >
      <h2
        id="galeria-teaser-heading"
        className="font-display text-4xl text-brand-pink sm:text-5xl"
      >
        Galería
      </h2>

      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {designCategories.map((category) => (
          <li key={category.id}>
            <Link href={`/galeria/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <GalleryGrid items={teaser} />
      </div>

      <Link
        href="/galeria"
        className="mt-10 inline-flex items-center rounded-full border border-brand-black px-6 py-3 font-medium transition-colors hover:bg-brand-black hover:text-brand-pink"
      >
        Ver toda la galería
      </Link>
    </section>
  );
}