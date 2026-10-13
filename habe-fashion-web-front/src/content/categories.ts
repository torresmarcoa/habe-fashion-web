import type { DesignCategory } from "@/types/content";

/**
 * Design categories (REQ-SHOWCASE-001).
 *
 * Data-driven so additional categories can be introduced without changing
 * presentation logic (REQ-SHOWCASE-002).
 *
 * `slug` is the URL path segment for the category route. It is declared
 * separately from `id` so a readable URL can differ from the internal
 * identifier, which keeps REQ-SEO-008 satisfied while leaving room to rename
 * an identifier without breaking links.
 */
export const designCategories: DesignCategory[] = [
  {
    id: "ballet",
    slug: "vestidos-de-ballet",
    name: "Vestidos de ballet",
    description: "Trajes de ballet para onstage y clases.",
  },
  {
    id: "casuales",
    slug: "vestidos-casuales",
    name: "Vestidos casuales",
    description: "Diseños para el día a día.",
  },
  {
    id: "bodas",
    slug: "vestidos-de-novia",
    name: "Vestidos de novia",
    description: "Prendas para bodas y otras ocasiones especiales.",
  },
  {
    id: "quinceaneras",
    slug: "vestidos-de-quinceanera",
    name: "Vestidos de quinceañera",
    description: "Diseños para la quinceañera.",
  },
  {
    id: "graduacion",
    slug: "vestidos-de-graduacion",
    name: "Vestidos de graduación",
    description: "Trajes para graduaciones.",
  },
  {
    id: "noche",
    slug: "vestidos-de-noche",
    name: "Vestidos de noche",
    description: "Vestidos de gala y de noche.",
  },
];

/** Resolves a category by its URL slug, or `undefined` when there is no match. */
export function findCategoryBySlug(slug: string): DesignCategory | undefined {
  return designCategories.find((category) => category.slug === slug);
}

/** Resolves a category by its internal identifier. */
export function findCategoryById(id: string): DesignCategory | undefined {
  return designCategories.find((category) => category.id === id);
}