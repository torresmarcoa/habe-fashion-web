import type { GalleryItem } from "@/types/content";

/**
 * Portfolio gallery items (REQ-GALLERY-001).
 *
 * All entries are placeholders. REQ-CONTENT-001 permits placeholder media
 * during development; production content must be replaceable with
 * designer-provided media (REQ-GALLERY-006).
 *
 * Production media will be delivered through Cloudinary (ADR-003). Each entry
 * stores a media reference, never a binary (REQ-CLOUDINARY-002). The `src`
 * values below are local SVG placeholders with no photographic content, and
 * their alternative text describes a placeholder rather than claiming to
 * depict a real garment.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "ballet-01",
    title: "Traje de ballet",
    alt: "Marcador de posición para un traje de ballet.",
    categoryId: "ballet",
    src: "/placeholder/ballet.svg",
    width: 800,
    height: 1000,
  },
  {
    id: "noche-01",
    title: "Vestido de noche",
    alt: "Marcador de posición para un vestido de noche.",
    categoryId: "noche",
    src: "/placeholder/noche.svg",
    width: 800,
    height: 1000,
  },
  {
    id: "quinceaneras-01",
    title: "Vestido de quinceañera",
    alt: "Marcador de posición para un vestido de quinceañera.",
    categoryId: "quinceaneras",
    src: "/placeholder/quinceaneras.svg",
    width: 800,
    height: 1000,
  },
];