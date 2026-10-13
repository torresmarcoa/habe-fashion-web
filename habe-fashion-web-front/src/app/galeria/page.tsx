import type { Metadata } from "next";

import { CategoryLinks, GalleryPageBody } from "@/components/gallery-grid";
import { galleryItems } from "@/content/gallery";

/**
 * REQ-SEO-001 and REQ-SEO-002: a distinct title and description for the
 * gallery index rather than the site-wide defaults.
 * REQ-SEO-008: a stable, meaningful URL.
 */
export const metadata: Metadata = {
  title: "Galería",
  description:
    "Portafolio de vestidos de Habe por Hannia Farfán: ballet, casuales, de novia, de quinceañera, de graduación y de noche.",
  alternates: { canonical: "/galeria" },
};

export default function GalleryIndexPage() {
  return (
    <>
      <GalleryPageBody
        title="Galería"
        description="Explora el trabajo por categoría."
        items={galleryItems}
      />

      <section
        aria-labelledby="categorias-heading"
        className="mx-auto max-w-6xl px-4 pb-16 md:pb-24"
      >
        <h2
          id="categorias-heading"
          className="font-display text-2xl text-brand-pink"
        >
          Categorías
        </h2>
        <CategoryLinks className="mt-6 flex flex-wrap gap-x-8 gap-y-3" />
      </section>
    </>
  );
}