import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryLinks, GalleryPageBody } from "@/components/gallery-grid";
import { designCategories, findCategoryBySlug } from "@/content/categories";
import { itemsInCategory } from "@/content/gallery";

/**
 * One route per design category.
 *
 * A separate, statically generated route per category gives each group its
 * own meaningful and indexable URL (REQ-SEO-008), rather than filtering a
 * single page with a query parameter.
 */
export function generateStaticParams() {
  return designCategories.map((category) => ({ categoria: category.slug }));
}

/**
 * REQ-SEO-001 and REQ-SEO-002: each category page gets its own title and
 * description built from the category's own content.
 */
export async function generateMetadata({
  params,
}: PageProps<"/galeria/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const category = findCategoryBySlug(categoria);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: `${category.name} de Habe por Hannia Farfán. ${category.description}`,
    alternates: { canonical: `/galeria/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/galeria/[categoria]">) {
  const { categoria } = await params;
  const category = findCategoryBySlug(categoria);

  if (!category) {
    notFound();
  }

  return (
    <>
      <GalleryPageBody
        title={category.name}
        description={category.description}
        items={itemsInCategory(category.id)}
      />

      <section
        aria-labelledby="otras-categorias-heading"
        className="mx-auto max-w-6xl px-4 pb-16 md:pb-24"
      >
        <h2
          id="otras-categorias-heading"
          className="font-display text-2xl text-brand-pink"
        >
          Otras categorías
        </h2>
        <CategoryLinks className="mt-6 flex flex-wrap gap-x-8 gap-y-3" />
      </section>
    </>
  );
}