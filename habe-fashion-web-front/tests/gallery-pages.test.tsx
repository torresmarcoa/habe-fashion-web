import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CategoryPage, { generateStaticParams } from "@/app/galeria/[categoria]/page";
import GalleryIndexPage, {
  metadata as indexMetadata,
} from "@/app/galeria/page";
import { designCategories } from "@/content/categories";
import { galleryItems } from "@/content/gallery";

/** Builds the props a dynamic page receives, with async params (Next.js 16). */
function propsFor(categoria: string) {
  return {
    params: Promise.resolve({ categoria }),
    searchParams: Promise.resolve({}),
  };
}

describe("gallery index", () => {
  it("renders a single level-one heading", () => {
    render(<GalleryIndexPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Galería" }),
    ).toBeInTheDocument();
  });

  it("renders every gallery item", () => {
    render(<GalleryIndexPage />);

    for (const item of galleryItems) {
      // Item titles hang directly from the page h1, so they are h2.
      expect(
        screen.getByRole("heading", { level: 2, name: item.title }),
      ).toBeInTheDocument();
    }
  });

  it("links to every category route", () => {
    render(<GalleryIndexPage />);

    for (const category of designCategories) {
      expect(
        screen.getByRole("link", { name: category.name }),
      ).toHaveAttribute("href", `/galeria/${category.slug}`);
    }
  });

  it("declares its own metadata", () => {
    expect(indexMetadata.title).toBe("Galería");
    expect(indexMetadata.alternates?.canonical).toBe("/galeria");
  });
});

describe("gallery category route", () => {
  it("generates one static path per category", () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(designCategories.length);
    expect(params).toEqual(
      designCategories.map((category) => ({ categoria: category.slug })),
    );
  });

  it("renders the category as the level-one heading", async () => {
    render(await CategoryPage(propsFor("vestidos-de-ballet")));

    expect(
      screen.getByRole("heading", { level: 1, name: "Vestidos de ballet" }),
    ).toBeInTheDocument();
  });

  it("renders only the items of that category", async () => {
    render(await CategoryPage(propsFor("vestidos-de-noche")));

    expect(
      screen.getByRole("heading", { level: 2, name: "Vestido de noche" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Traje de ballet" }),
    ).not.toBeInTheDocument();
  });

  it("states plainly when a category has no pieces yet", async () => {
    render(await CategoryPage(propsFor("vestidos-de-graduacion")));

    expect(
      screen.getByText("Todavía no hay piezas en esta categoría."),
    ).toBeInTheDocument();
  });

  it("keeps navigation to other categories available", async () => {
    render(await CategoryPage(propsFor("vestidos-de-noche")));

    expect(
      screen.getByRole("heading", { level: 2, name: "Otras categorías" }),
    ).toBeInTheDocument();
  });

  it("returns not found for an unknown category", async () => {
    await expect(CategoryPage(propsFor("no-existe"))).rejects.toThrow();
  });
});