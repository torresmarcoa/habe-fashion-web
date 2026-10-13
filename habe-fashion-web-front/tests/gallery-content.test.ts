import { describe, expect, it } from "vitest";

import {
  designCategories,
  findCategoryById,
  findCategoryBySlug,
} from "@/content/categories";
import { galleryItems, itemsInCategory } from "@/content/gallery";

describe("designCategories", () => {
  it("declares the categories required by REQ-SHOWCASE-001", () => {
    expect(designCategories.map((category) => category.id)).toEqual([
      "ballet",
      "casuales",
      "bodas",
      "quinceaneras",
      "graduacion",
      "noche",
    ]);
  });

  it("gives every category a unique, URL-safe slug", () => {
    const slugs = designCategories.map((category) => category.slug);

    expect(new Set(slugs).size).toBe(slugs.length);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("resolves by slug and by id", () => {
    expect(findCategoryBySlug("vestidos-de-novia")?.id).toBe("bodas");
    expect(findCategoryById("bodas")?.slug).toBe("vestidos-de-novia");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findCategoryBySlug("no-existe")).toBeUndefined();
  });
});

describe("galleryItems", () => {
  it("references only declared categories", () => {
    const known = new Set(designCategories.map((category) => category.id));

    for (const item of galleryItems) {
      expect(known.has(item.categoryId)).toBe(true);
    }
  });

  it("gives every item descriptive alternative text", () => {
    for (const item of galleryItems) {
      // REQ-GALLERY-004: meaningful images need descriptive alt text.
      expect(item.alt.length).toBeGreaterThan(0);
      expect(item.alt).not.toBe(item.title);
    }
  });

  it("declares media with dimensions for layout stability", () => {
    for (const item of galleryItems) {
      expect(item.media.width).toBeGreaterThan(0);
      expect(item.media.height).toBeGreaterThan(0);
    }
  });

  it("filters by category", () => {
    expect(itemsInCategory("ballet").map((item) => item.id)).toEqual([
      "ballet-01",
    ]);
    expect(itemsInCategory("bodas")).toEqual([]);
  });

  it("uses unique item ids", () => {
    const ids = galleryItems.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});