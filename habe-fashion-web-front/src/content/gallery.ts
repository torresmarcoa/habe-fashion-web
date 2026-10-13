import type { GalleryItem } from "@/types/content";

/**
 * Portfolio gallery items (REQ-GALLERY-001).
 *
 * All entries are PLACEHOLDER pending designer assets (REQ-GALLERY-006).
 *
 * Media is declared by Cloudinary public ID, never as a binary or as a stored
 * URL string (REQ-CLOUDINARY-002). Replace each `publicId` when the real
 * photographs are delivered; the surrounding code does not change.
 *
 * Naming conventions for Cloudinary are still an open question in ADR-003.
 * The ids below are placeholders that already point at a temporary banner
 * image so the layout can be judged before the real assets exist.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "ballet-01",
    title: "Traje de ballet",
    alt: "Marcador de posición para un traje de ballet.",
    categoryId: "ballet",
    media: {
      publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
      width: 800,
      height: 1000,
    },
  },
  {
    id: "noche-01",
    title: "Vestido de noche",
    alt: "Marcador de posición para un vestido de noche.",
    categoryId: "noche",
    media: {
      publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
      width: 800,
      height: 1000,
    },
  },
  {
    id: "quinceaneras-01",
    title: "Vestido de quinceañera",
    alt: "Marcador de posición para un vestido de quinceañera.",
    categoryId: "quinceaneras",
    media: {
      publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
      width: 800,
      height: 1000,
    },
  },
];

/** Items belonging to a category, in declaration order. */
export function itemsInCategory(categoryId: string): GalleryItem[] {
  return galleryItems.filter((item) => item.categoryId === categoryId);
}

/** How many items the homepage teaser shows before linking to the full gallery. */
export const homeTeaserLimit = 3;